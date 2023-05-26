import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Food } from './entities/food-entity';
import { CreateFoodDto } from './dto/create-food';
import { UpdateFoodDto } from './dto/update-food';
import { Restaurant } from '../restaurant/entities/restaurant-entity';
import { RestaurantService } from '../restaurant/restaurant.service';
import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/entities/photo-entity';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food) private repo: Repository<Food>,
    private restaurantService: RestaurantService,
    private photoService: PhotoService,
  ) {}


  create(createFoodDto: CreateFoodDto, res: Restaurant) {
    const food = this.repo.create(createFoodDto);
    food.restaurants = [res];
    return this.repo.save(food);
  }

  createFood(createFoodDto: CreateFoodDto, photo: Photo) {
    const food = this.repo.create(createFoodDto);
    food.photos = [photo];
    return this.repo.save(food);
  }

  

  findOne(id: string) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id: parseInt(id) });
  }

  async update(id: string, dto: UpdateFoodDto) {
      const food = await this.repo.findOne({ where: { id: parseInt(id) } });
      await this.repo.update(food.id, dto);
      return await this.repo.findOne({ where: { id: parseInt(id) } });
  }

  async remove(id: string) {
    const food = await this.repo.findOneBy({ id: parseInt(id) });
    if (!food) {
      throw new NotFoundException('User not found');
    }
    return this.repo.remove(food);
  }

  async getFoodDetails(id: string) {
    const food = await this.repo.findOne({ where: { id: parseInt(id) } });

    if (!food) {
      throw new NotFoundException('Food not found');
    }

    const { name, description, price } = food;

    const loadedPhotos = food.photos
      ? await this.repo.find({
          where: { id: In(food.photos.map((photo) => photo.id)) },
          relations: ['photos'],
        })
      : [];

      return {
        name,
        description,
        photos: loadedPhotos.map((photo) => ({
          id: photo.id,
        })),
      };
  }

}