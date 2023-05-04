import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './entities/food-entity';
import { Restaurant } from '../restaurant/entities/restaurant-entity';
import { RestaurantService } from '../restaurant/restaurant.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Food]), 
    TypeOrmModule.forFeature([Restaurant]),
],
  providers: [FoodService, RestaurantService],
  controllers: [FoodController],
  exports: [FoodService],
})
export class FoodModule {}
