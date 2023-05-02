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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Restaurant } from './entities/restaurant-entity';
import { PhotoService } from '../photo/photo.service';

@Controller('restaurants')
@ApiTags('Restaurant')
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly photoService: PhotoService,
  ) {}

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

  @Post('/photos/:id')
  @UseInterceptors(FileInterceptor('file'))
  async addPhotoToRestaurant(
    @Param('id') restaurantId: number,
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<Restaurant> {
    const dataBuffer = photo.buffer;
    const filename = photo.originalname;
    const newPhoto = await this.photoService.uploadPhotos(dataBuffer, filename);
    return this.restaurantService.addPhotoToRestaurant(restaurantId, newPhoto);
  }
}
