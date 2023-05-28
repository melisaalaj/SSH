import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from '../restaurant/entities/restaurant-entity';
import { RestaurantService } from '../restaurant/restaurant.service';
import { Photo } from '../photo/entities/photo-entity';
import { PhotoService } from '../photo/photo.service';
import { Booking } from './entities/booking-entity';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { PhotoModule } from '../photo/photo.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), RestaurantModule, PhotoModule],
  providers: [BookingService],
  controllers: [BookingController],
  exports: [BookingService],
})
export class BookingModule {}
