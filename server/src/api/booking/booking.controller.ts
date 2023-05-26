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
import { BookingService } from './booking.service';
import { RestaurantService } from '../restaurant/restaurant.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
  
  @ApiTags('Booking')
  @Controller('booking')
  export class BookingController {
    constructor(
      private readonly bookingService: BookingService,
      private readonly restaurantService: RestaurantService,
    ) {}
  
    @Post('/create/:id')
    async create(
      @Param('id') restaurantId: string,
      @Body() createBookingDto: CreateBookingDto,
    ) {
      const restaurant = await this.restaurantService.findOne(restaurantId);
      if (!restaurant) {
        throw new NotFoundException('Restaurant not found');
      }
  
      const booking = await this.bookingService.create(createBookingDto, restaurant);
  
      return booking;
    }
  
    @Post('/update/:id')
    async update(@Param('id') id: string, @Body() body: UpdateBookingDto) {
      return await this.bookingService.update(id, body);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      const booking = await this.bookingService.findOne(id);
      if (!booking) {
        throw new NotFoundException('Booking not found');
      }
      await this.bookingService.remove(id);
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      const booking = await this.bookingService.findOne(id);
      if (!booking) {
        throw new NotFoundException('Booking not found');
      }
      return booking;
    }
  
    @Get()
    async findAll() {
      return await this.bookingService.findAll();
    }
  
    @Get('/info/:id')
    async getRestaurantInfo(@Param('id') id: string) {
      const bookingInfo = await this.bookingService.getOrderDetails(id);
  
      if (!bookingInfo) {
        throw new NotFoundException('Booking not found');
      }
  
      return bookingInfo;
    }
  }
  