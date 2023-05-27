import { Module } from "@nestjs/common";
import { DeliveryController } from "./delivery.controller";
import { DeliveryService } from "./delivery.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Delivery } from "./entities/delivery-entity";
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
