import { Module } from "@nestjs/common";
import { DeliveryController } from "./delivery.controller";
import { DeliveryService } from "./delivery.service";

import { TypeOrmModule } from "@nestjs/typeorm";
import { Delivery } from "./entities/delivery-entity";
import { RestaurantService } from "../restaurant/restaurant.service";
import { Restaurant } from "../restaurant/entities/restaurant-entity";
import { PhotoService } from "../photo/photo.service";
import { Photo } from "../photo/entities/photo-entity";
import { PhotoModule } from "../photo/photo.module";
import { RestaurantModule } from "../restaurant/restaurant.module";
import { UserModule } from "../user/user.module";


@Module({
  imports: [
    TypeOrmModule.forFeature([Delivery]),
    PhotoModule,
    RestaurantModule,
    UserModule
  ],
  providers: [DeliveryService],
  controllers: [DeliveryController],
  exports: [DeliveryService],
})
export class DeliveryModule {}
