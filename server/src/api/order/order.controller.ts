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
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { RestaurantService } from '../restaurant/restaurant.service';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly restaurantService: RestaurantService,
  ) {}

  @Post('/create/:id')
  async create(
    @Param('id') restaurantId: string,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    const restaurant = await this.restaurantService.findOne(restaurantId);
    if (!restaurant) {
      throw new NotFoundException('Order not found');
    }

    const order = await this.orderService.create(createOrderDto, restaurant);

    return order;
  }

  @Post('/update/:id')
  async update(@Param('id') id: string, @Body() body: UpdateOrderDto) {
    return await this.orderService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const order = await this.orderService.findOne(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    await this.orderService.remove(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const order = await this.orderService.findOne(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  @Get()
  async findAll() {
    return await this.orderService.findAll();
  }

  @Get('/info/:id')
  async getRestaurantInfo(@Param('id') id: string) {
    const orderInfo = await this.orderService.getOrderDetails(id);

    if (!orderInfo) {
      throw new NotFoundException('Order not found');
    }

    return orderInfo;
  }
}
