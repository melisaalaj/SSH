import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
  } from '@nestjs/common';
  import { ApiTags } from '@nestjs/swagger';
import { RestaurantService } from '../restaurant/restaurant.service';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { EventService } from './event.service';

  
  @ApiTags('Event')
  @Controller('Event')
  export class EventController {
    constructor(
      private readonly eventService: EventService,
      private readonly resturantService: RestaurantService,
    ) {}
  
    @Post('/create/:id')
  async createEvent(
    @Param('id') restaurantId: string,
    @Body() createEventDto: CreateEventDto,
  ) {
    const restaurant = await this.resturantService.findOne(restaurantId);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    const event = await this.eventService.create(
      createEventDto,
      restaurant,
    );

    return event;
  }
  
    @Post('/update/:id')
    async update(@Param('id') id: string, @Body() body: UpdateEventDto) {
      return await this.eventService.update(id, body);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      const event = await this.eventService.findOne(id);
      if (!event) {
        throw new NotFoundException('Event not found');
      }
      await this.eventService.remove(id);
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      const event = await this.eventService.findOne(id);
      if (!event) {
        throw new NotFoundException('Event not found');
      }
      return event;
    }
  }
  