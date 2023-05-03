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
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { RestaurantService } from '../restaurant/restaurant.service';
import { UpdateLocationDto } from './dto/update-location.dto';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
    private readonly resturantService: RestaurantService,
  ) {}

  @Post('/create/:id')
  async createLocation(
    @Param('id') restaurantId: string,
    @Body() createLocationDto: CreateLocationDto,
  ) {
    const restaurant = await this.resturantService.findOne(restaurantId);
    if (!restaurant) {
      throw new NotFoundException('Location not found');
    }

    const location = await this.locationService.create(
      createLocationDto,
      restaurant,
    );

    return location;
  }

  @Post('/update/:id')
  async update(@Param('id') id: string, @Body() body: UpdateLocationDto) {
    return await this.locationService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const location = await this.locationService.findOne(id);
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    await this.locationService.remove(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const location = await this.locationService.findOne(id);
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    return location;
  }
}
