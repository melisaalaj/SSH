import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant-entity';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Photo } from '../photo/entities/photo-entity';
import { Readable } from 'stream';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant) private repo: Repository<Restaurant>,
  ) {}

  create(createRestaurantDto: CreateRestaurantDto) {
    return this.repo.save(this.repo.create(createRestaurantDto));
  }

  async findOne(id: string) {
    const res = await this.repo.findOneBy({ id: parseInt(id) });
    if (!res) {
      throw new NotFoundException();
    }
    return res;
  }

  async remove(id: string) {
    const restaurant = await this.findOne(id);
    return this.repo.remove(restaurant);
  }

  async update(id: string, dto: UpdateRestaurantDto) {
    const restaurant = await this.findOne(id);
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
        data: Readable.from(photo.data),
      })),
      locations: locations.map((location) => ({
        id: location.id,
        city: location.city,
        street: location.street,
        postalCode: location.postalCode,
      })),
    };
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
