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
import { ApiTags } from '@nestjs/swagger';
import { RestaurantService } from '../restaurant/restaurant.service';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dtos/create-delivery.dto';
import { UpdateDeliveryDto } from './dtos/update-delivery.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserRoles } from '../user/enums/roles.enum';
import { Roles } from '../../common/decorators/roles.decorato';

@ApiTags('Delivery')
@Controller('delivery')
@UsePipes(new ValidationPipe())
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard, RolesGuard)
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
