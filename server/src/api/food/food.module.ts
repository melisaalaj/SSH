import { forwardRef, Module } from '@nestjs/common';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { PhotoModule } from '../photo/photo.module';
import { UserModule } from '../user/user.module';
import { StripeModule } from '../stripe/stripe.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './entities/food-entity';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { StripeService } from '../stripe/stripe.service';
import { ConfigModule } from '@nestjs/config';
import { MenuModule } from '../menu/menu.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Food]),
    RestaurantModule,
    PhotoModule,
    ConfigModule,
    UserModule,
    MenuModule,
  ],
  providers: [FoodService, StripeService],
  controllers: [FoodController],
  exports: [FoodService],
})
export class FoodModule {}
