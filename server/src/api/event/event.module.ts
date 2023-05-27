import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService } from './event.service';
import { Event } from './entities/event-entity';
import { EventController } from './event.controller';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { PhotoModule } from '../photo/photo.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), RestaurantModule, PhotoModule, UserModule],
  providers: [EventService],
  controllers: [EventController],
  exports: [EventService],
})
export class EventModule {}
