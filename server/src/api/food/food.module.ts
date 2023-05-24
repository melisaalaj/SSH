import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './entities/food-entity';
import { Restaurant } from '../restaurant/entities/restaurant-entity';
import { RestaurantService } from '../restaurant/restaurant.service';
import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/entities/photo-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Food]), 
    TypeOrmModule.forFeature([Restaurant]),
    TypeOrmModule.forFeature([Photo]),
],
  providers: [FoodService, RestaurantService, PhotoService],
  controllers: [FoodController],
  exports: [FoodService],
})
export class FoodModule {}
