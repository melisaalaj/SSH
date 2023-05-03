import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant-entity';
import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/entities/photo-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant]),
    TypeOrmModule.forFeature([Photo]),
  ],
  providers: [RestaurantService, PhotoService],
  controllers: [RestaurantController],
  exports: [RestaurantService],
})
export class RestaurantModule {}
