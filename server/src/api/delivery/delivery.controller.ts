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
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dtos/create-delivery.dto';
import { UpdateDeliveryDto } from './dtos/update-delivery.dto';

  
  @ApiTags('Delivery')
  @Controller('delivery')
  export class DeliveryController {
    constructor(
      private readonly deliveryService: DeliveryService,
      private readonly resturantService: RestaurantService,
    ) {}
  
    @Post('/create/:id')
  async createDelivery(
    @Param('id') restaurantId: string,
    @Body() createDeliveryDto: CreateDeliveryDto,
  ) {
    const restaurant = await this.resturantService.findOne(restaurantId);
    if (!restaurant) {
      throw new NotFoundException('Delivery not found');
    }

    const delivery = await this.deliveryService.create(
      createDeliveryDto,
      restaurant,
    );

    return delivery;
  }
  
    @Post('/update/:id')
    async update(@Param('id') id: string, @Body() body: UpdateDeliveryDto) {
      return await this.deliveryService.update(id, body);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      const delivery = await this.deliveryService.findOne(id);
      if (!delivery) {
        throw new NotFoundException('Delivery not found');
      }
      await this.deliveryService.remove(id);
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      const delivery = await this.deliveryService.findOne(id);
      if (!delivery) {
        throw new NotFoundException('Delivery not found');
      }
      return delivery;
    }
  }
  