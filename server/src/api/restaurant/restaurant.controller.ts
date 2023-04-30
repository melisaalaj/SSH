import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurants')
@ApiTags('Restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post('/create')
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(createRestaurantDto);
  }

  @Post('/update/:id')
  async update(@Param('id') id: string, @Body() body: UpdateRestaurantDto) {
    return await this.restaurantService.update(id, body);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const restaurant = await this.restaurantService.findOne(id);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }
    return restaurant;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const restaurant = await this.restaurantService.findOne(id);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }
    await this.restaurantService.remove(id);
  }

  @Get('/info/:id')
  async getRestaurantInfo(@Param('id') id: string) {
    const restaurantInfo = await this.restaurantService.getRestaurantDetails(
      id,
    );
    if (!restaurantInfo) {
      throw new NotFoundException('Restaurant not found');
    }
    return restaurantInfo;
  }
}
