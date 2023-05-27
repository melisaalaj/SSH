import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RestaurantService } from '../restaurant/restaurant.service';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dtos/create-delivery.dto';
import { UpdateDeliveryDto } from './dtos/update-delivery.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserRoles } from '../user/enums/roles.enum';
import { Roles } from 'src/common/decorators/roles.decorato';
import { OrderService } from '../order/order.service';

@ApiTags('Delivery')
@Controller('delivery')
@UsePipes(new ValidationPipe())
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
export class DeliveryController {
  constructor(
    private readonly deliveryService: DeliveryService,
    private readonly orderService: OrderService,
  ) {}

  @Roles(UserRoles.ADMIN)
  @Post('/create/:id')
  async createDelivery(
    @Param('id') orderId: string,
    @Body() createDeliveryDto: CreateDeliveryDto,
  ) {
    const order = await this.orderService.findOne(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const delivery = await this.deliveryService.create(
      createDeliveryDto,
      order,
    );

    return delivery;
  }

  @Roles(UserRoles.ADMIN)
  @Post('/update/:id')
  async update(@Param('id') id: string, @Body() body: UpdateDeliveryDto) {
    return await this.deliveryService.update(id, body);
  }

  @Roles(UserRoles.ADMIN)
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
