import { Module } from "@nestjs/common";
import { DeliveryController } from "./delivery.controller";
import { DeliveryService } from "./delivery.service";

import { TypeOrmModule } from "@nestjs/typeorm";
import { Delivery } from "./entities/delivery-entity";
import { RestaurantService } from "../restaurant/restaurant.service";
import { Restaurant } from "../restaurant/entities/restaurant-entity";
import { PhotoService } from "../photo/photo.service";
import { Photo } from "../photo/entities/photo-entity";


@Module({
  imports: [
    TypeOrmModule.forFeature([Delivery]),
    TypeOrmModule.forFeature([Restaurant]),
    TypeOrmModule.forFeature([Photo]),
  ],
  providers: [DeliveryService, RestaurantService, PhotoService],
  controllers: [DeliveryController],
  exports: [DeliveryService],
})
export class DeliveryModule {}
