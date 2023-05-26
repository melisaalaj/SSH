import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/orders-entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Restaurant } from '../restaurant/entities/restaurant-entity';
import { Food } from '../food/entities/food-entity';
import { RestaurantService } from '../restaurant/restaurant.service';
import { FoodService } from '../food/food.service';
import { Photo } from '../photo/entities/photo-entity';
import { PhotoService } from '../photo/photo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([Restaurant]),
    TypeOrmModule.forFeature([Photo]),
    TypeOrmModule.forFeature([Food]),
  ],
  providers: [
    OrderService,
    RestaurantService,
    PhotoService,
    FoodService,
  ],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule { }
