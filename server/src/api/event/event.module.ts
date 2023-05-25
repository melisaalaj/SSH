import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Restaurant } from "../restaurant/entities/restaurant-entity";
import { Photo } from "../photo/entities/photo-entity";
import { EventService } from "./event.service";
import { RestaurantService } from "../restaurant/restaurant.service";
import { PhotoService } from "../photo/photo.service";
import { Event } from './entities/event-entity'; 
import { EventController } from "./event.controller";


@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    TypeOrmModule.forFeature([Restaurant]),
    TypeOrmModule.forFeature([Photo]),
  ],
  providers: [EventService, RestaurantService, PhotoService],
  controllers: [EventController],
  exports: [EventService],
})
export class EventModule {}
