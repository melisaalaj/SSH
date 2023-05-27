import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/orders-entity';
import { Delivery } from '../delivery/entities/delivery-entity';
import { OrderService } from './order.service';
import { DeliveryService } from '../delivery/delivery.service';
import { OrderController } from './order.controller';
import { Restaurant } from '../restaurant/entities/restaurant-entity';
import { Food } from '../food/entities/food-entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { RestaurantService } from '../restaurant/restaurant.service';
import { FoodService } from '../food/food.service';
import { Photo } from '../photo/entities/photo-entity';
import { PhotoService } from '../photo/photo.service';
import { StripeModule } from '../stripe/stripe.module';
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
