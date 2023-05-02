import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant-entity';
import { In, Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/entities/photo-entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant) private repo: Repository<Restaurant>,
    private readonly photoService: PhotoService,
  ) {}

  create(createRestaurantDto: CreateRestaurantDto) {
    return this.repo.save(this.repo.create(createRestaurantDto));
  }

  findOne(id: string) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id: parseInt(id) });
  }

  async remove(id: string) {
    const restaurant = await this.repo.findOneBy({ id: parseInt(id) });
    if (!restaurant) {
      throw new NotFoundException('User not found');
    }
    return this.repo.remove(restaurant);
  }

  // async getRestaurantInfo(id: number) {
  //   const restaurant = await this.repo.createQueryBuilder('restaurant').
  //   leftJoinAndSelect('restaurant.photos', 'photo')
  //   .leftJoinAndSelect('restaurant.locations', 'location')
  //   .select(['photo.url', 'restaurant.name', 'location.city', 'location.street', 'restaurant.description'])
  //   .getOne()

  //   return {
  //     photo: restaurant.photo,
  //     name: restaurant.name,
  //     location: restaurant.locations.city + restaurant.locations.street,
  //     description: restaurant.description
  //   }

  async update(id: string, dto: UpdateRestaurantDto) {
    const restaurant = await this.repo.findOne({ where: { id: parseInt(id) } });
    await this.repo.update(restaurant.id, dto);
    return await this.repo.findOne({ where: { id: parseInt(id) } });
  }

  async getRestaurantDetails(id: string) {
    const restaurant = await this.repo.findOne({ where: { id: parseInt(id) } });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    const { name, description } = restaurant;

    const loadedPhotos = restaurant.photos
      ? await this.repo.find({
          where: { id: In(restaurant.photos.map((photo) => photo.id)) },
          relations: ['photos'],
        })
      : [];

    const location = restaurant.locations
      ? await this.repo.find({
          where: {
            id: In(restaurant.locations.map((location) => location.id)),
          },
          relations: ['locations'],
        })
      : [];

    return {
      name,
      description,
      photos: loadedPhotos.map((photo) => ({
        id: photo.id,
      })),

      locations: location.map((location) => ({
        id: location.id,
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
