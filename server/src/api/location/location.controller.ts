import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { RestaurantService } from '../restaurant/restaurant.service';
import { UpdateLocationDto } from './dto/update-location.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AuthGuard } from '../auth/auth.guard';
import { UserRoles } from '../user/enums/roles.enum';
import { Roles } from '../../common/decorators/roles.decorato';

@Controller('location')
@ApiBearerAuth()
@ApiTags('Location')
@UsePipes(new ValidationPipe())
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard, RolesGuard)
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
    private readonly resturantService: RestaurantService,
  ) {}

  @Roles(UserRoles.ADMIN)
  @Post('/create/:id')
  async createLocation(
    @Param('id') restaurantId: string,
    @Body() createLocationDto: CreateLocationDto,
  ) {
    const restaurant = await this.resturantService.findOne(restaurantId);
    const location = await this.locationService.create(
      createLocationDto,
      restaurant,
    );

    return location;
  }

  @Roles(UserRoles.ADMIN)
  @Post('/update/:id')
  async update(@Param('id') id: string, @Body() body: UpdateLocationDto) {
    return await this.locationService.update(id, body);
  }

  @Roles(UserRoles.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.locationService.remove(id);
  }

  @Get()
  async getLocation(
    @Query('city') city?: string,
    @Query('street') street?: string,
  ) {
    const location = await this.locationService.findByName(city, street);
    return location;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.locationService.findOne(id);
  }
}
