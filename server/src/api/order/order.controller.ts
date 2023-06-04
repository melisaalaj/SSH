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
import { Roles } from '../../common/decorators/roles.decorato';
import { UserRoles } from '../user/enums/roles.enum';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly restaurantService: RestaurantService,
  ) { }

  @Post('/create/:restaurantid')
  async create(
    @Param('restaurantid') restaurantId: string,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    const restaurant = await this.restaurantService.findOne(restaurantId);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    const order = await this.orderService.create(createOrderDto, restaurant);

    return order;
  }

  @Post('/update/:orderid')
  async update(@Param('orderid') id: string, @Body() body: UpdateOrderDto) {
    return await this.orderService.update(id, body);
  }

  @Roles(UserRoles.ADMIN)
  @Delete(':orderid')
  async remove(@Param('orderid') id: string) {
    const order = await this.orderService.findOne(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    await this.orderService.remove(id);
  }

  @Roles(UserRoles.ADMIN)
  @Get(':orderid')
  async findOne(@Param('orderid') id: string) {
    const order = await this.orderService.findOne(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
  
  @Roles(UserRoles.ADMIN)
  @Get()
  async findAll() {
    return await this.orderService.findAll();
  }

  @Roles(UserRoles.ADMIN)
  @Get('/info/:orderid')
  async getRestaurantInfo(@Param('orderid') id: string) {
    const orderInfo = await this.orderService.getOrderDetails(id);

    if (!orderInfo) {
      throw new NotFoundException('Order not found');
    }

    return orderInfo;
  }

  @Post(':orderId/foods/:foodId')
  addFoodToOrder(@Param('orderId') orderId: string, @Param('foodId') foodId: string) {
    return this.orderService.addFoodToOrder(orderId, foodId);
  }
}