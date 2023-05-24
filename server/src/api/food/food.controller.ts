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
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food';
import { UpdateFoodDto } from './dto/update-food';
import { Photo } from '../photo/entities/photo-entity';


@ApiTags('Food')
@Controller('food')
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
  @Post('/create/:id')
  async createFood(
    @Param('id') restaurantId: string,
    @Body() createFoodDto: CreateFoodDto,
    @Body() photo: Photo,
  ) {
    const restaurant = await this.resturantService.findOne(restaurantId);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }
  
    const food = await this.foodService.createFood(createFoodDto, photo);
    food.restaurants = [restaurant];
    return food;
  }

  @Post('/update/:id')
  async update(@Param('id') id: string, @Body() body: UpdateFoodDto) {
    return await this.foodService.update(id, body);
  }

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