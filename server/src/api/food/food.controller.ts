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
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food';
import { UpdateFoodDto } from './dto/update-food';
import { Photo } from '../photo/entities/photo-entity';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserRoles } from '../user/enums/roles.enum';
import { Roles } from 'src/common/decorators/roles.decorato';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Food')
@Controller('food')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard, RolesGuard)
export class FoodController {
  constructor(
    private readonly foodService: FoodService,
    private readonly resturantService: RestaurantService,
  ) {}

  // @Post('/create/:id')
  // async createFood(
  //   @Param('id') restaurantId: string,
  //   @Body() createFoodDto: CreateFoodDto,
  // ) {
  //   const restaurant = await this.resturantService.findOne(restaurantId);
  //   if (!restaurant) {
  //     throw new NotFoundException('Food not found');
  //   }

  //   const food = await this.foodService.create(
  //     createFoodDto,
  //     restaurant,
  //   );

  //   return food;
  // }

  // @Post('/create/:id')
  // async createFood(
  // @Param('id') restaurantId: string,
  // @Body() createFoodDto: CreateFoodDto,
  // @Body() photo: Photo,
  // ) {
  // const restaurant = await this.resturantService.findOne(restaurantId);
  // if (!restaurant) {
  //   throw new NotFoundException('Food not found');
  // }

  // const food = await this.foodService.createFood(
  //   createFoodDto,
  //   photo,
  // );

  // return food;
  // }

  @Roles(UserRoles.ADMIN)
  @Post('/create/:id')
  async createFood(
    @Param('id') restaurantId: string,
    @Body() createFoodDto: CreateFoodDto,
    @Body() photo?: Photo,
  ) {
    const restaurant = await this.resturantService.findOne(restaurantId);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    const food = await this.foodService.create(createFoodDto, restaurant, photo);
    return food;
  }

  @Roles(UserRoles.ADMIN)
  @Post('/update/:id')
  async update(@Param('id') id: string, @Body() body: UpdateFoodDto) {
    return await this.foodService.update(id, body);
  }

  @Roles(UserRoles.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const food = await this.foodService.findOne(id);
    if (!food) {
      throw new NotFoundException('Food not found');
    }
    await this.foodService.remove(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const food = await this.foodService.findOne(id);
    if (!food) {
      throw new NotFoundException('Food not found');
    }
    return food;
  }
}
