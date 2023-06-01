import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Restaurant } from './entities/restaurant-entity';
import { PhotoService } from '../photo/photo.service';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../../common/decorators/roles.decorato';
import { UserRoles } from '../user/enums/roles.enum';

@Controller('restaurants')
@UsePipes(new ValidationPipe())
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Restaurant')
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly photoService: PhotoService,
  ) {}

  @Roles(UserRoles.ADMIN)
  @Post('/create')
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(createRestaurantDto);
  }

  @Roles(UserRoles.ADMIN)
  @Post('/update/:id')
  async update(@Param('id') id: string, @Body() body: UpdateRestaurantDto) {
    return await this.restaurantService.update(id, body);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const restaurant = await this.restaurantService.findOne(id);
    return restaurant;
  }

  @Get()
  async getLocation(@Query('name') name?: string) {
    const restaurant = await this.restaurantService.findByName(name);
    return restaurant;
  }

  @Roles(UserRoles.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.restaurantService.remove(id);
  }

  @Get('/info/:id')
  async getRestaurantInfo(@Param('id') id: string) {
    const restaurantInfo = await this.restaurantService.getRestaurantDetails(
      id,
    );

    return restaurantInfo;
  }

  @Roles(UserRoles.ADMIN)
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
