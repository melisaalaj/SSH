import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review-entity';
import { Restaurant } from '../restaurant/entities/restaurant-entity';
import { RestaurantService } from '../restaurant/restaurant.service';
import { PhotoService } from '../photo/photo.service';
import { LocationService } from '../location/location.service';
import { Photo } from '../photo/entities/photo-entity';
import { Location } from '../location/entities/location-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    TypeOrmModule.forFeature([Restaurant]),
    TypeOrmModule.forFeature([Photo]),
    TypeOrmModule.forFeature([Location]),
  ],
  providers: [ReviewService, RestaurantService, PhotoService, LocationService],
  controllers: [ReviewController],
  exports: [ReviewService],
})
export class ReviewModule {}
