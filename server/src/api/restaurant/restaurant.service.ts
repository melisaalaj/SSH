import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant-entity';
import { ILike, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Photo } from '../photo/entities/photo-entity';
import { Readable } from 'stream';
import { Location } from '../location/entities/location-entity';
import { LocationService } from '../location/location.service';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private repo: Repository<Restaurant>,
    private locationService: LocationService,
  ) {
    if (!this.repo) {
      throw new Error('Repository is not properly injected');
    }
  }

  async create(dto: CreateRestaurantDto): Promise<Restaurant> {
    console.log('Received DTO:', dto);

    const newRestaurant = this.repo.create(dto);
    console.log('Created Restaurant:', newRestaurant);

    let newLocation: Location | undefined;
    if (dto.location) {
      newLocation = await this.locationService.create(dto.location);
      console.log('Created Location:', newLocation);
      newRestaurant.locations = [newLocation];
    }

    if (dto.image) {
      console.log('Image Filename:', dto.image.filename);
      newRestaurant.image = dto.image.filename; // Save the image filename
    }

    const createdRestaurant = await this.repo.save(newRestaurant);
    console.log('Created Restaurant:', createdRestaurant);

    return createdRestaurant;
  }

  async findOne(id: string) {
    const restaurant = await this.repo.findOne({
      where: { id: parseInt(id) },
      relations: ['locations'],
    });
  
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }
  
    return restaurant;
  }

  async remove(id: string) {
    const restaurant = await this.findOne(id);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }
    await this.repo.remove(restaurant);
  }

  async update(id: string, dto: UpdateRestaurantDto) {
    const restaurant = await this.findOne(id);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }
    await this.repo.update(restaurant.id, dto);
  }

  async getRestaurantDetails(id: string) {
    const restaurant = await this.repo.findOne({
      where: { id: parseInt(id) },
      relations: ['photos', 'locations'],
    });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    const { name, description } = restaurant;
    const loadedPhotos = restaurant.photos || [];
    const locations = restaurant.locations || [];

    return {
      name,
      description,
      photos: loadedPhotos.map((photo) => ({
        id: photo.id,
        data: Readable.from([photo.data]),
      })),
      locations: locations.map((location) => ({
        id: location.id,
        city: location.city,
        street: location.street,
        postalCode: location.postalCode,
      })),
    };
  }

  async findByName(name?: string) {
    const restaurant = {
      where: {
        ...(name && { name: ILike(`%${name}%`) }),
      },
    };

    return await this.repo.find(restaurant);
  }

  async addPhotoToRestaurant(
    restaurantId: number,
    photo: Photo,
  ): Promise<Restaurant> {
    const restaurant = await this.repo.findOne({
      where: { id: restaurantId },
      relations: ['photos'],
    });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    restaurant.photos = restaurant.photos || [];
    restaurant.photos.push(photo);
    return this.repo.save(restaurant);
  }
  
}
