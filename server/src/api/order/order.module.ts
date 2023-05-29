import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/orders-entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { PhotoModule } from '../photo/photo.module';
import { FoodModule } from '../food/food.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    RestaurantModule,
    PhotoModule,
    FoodModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
