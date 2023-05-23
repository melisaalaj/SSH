import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location-entity';
import { Restaurant } from '../restaurant/entities/restaurant-entity';
import { RestaurantService } from '../restaurant/restaurant.service';
import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/entities/photo-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location]),
    TypeOrmModule.forFeature([Restaurant]),
    TypeOrmModule.forFeature([Photo]),
  ],
  providers: [LocationService, RestaurantService, PhotoService],
  controllers: [LocationController],
  exports: [LocationService],
})
export class LocationModule {}
