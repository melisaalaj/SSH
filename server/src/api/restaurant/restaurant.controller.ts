import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import {
  CreateLocationDto,
  CreateRestaurantDto,
} from './dto/create-restaurant.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Restaurant } from './entities/restaurant-entity';
import { PhotoService } from '../photo/photo.service';
import { Roles } from '../../common/decorators/roles.decorato';
import { UserRoles } from '../user/enums/roles.enum';
import { diskStorage } from 'multer';
import { LocationService } from '../location/location.service';
import { AuthGuard } from '../auth/auth.guard';

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
    private readonly locationService: LocationService,
  ) {}

  @Roles(UserRoles.ADMIN)
  @Roles(UserRoles.ADMIN)
  @Post('/create')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const { email } = req.body;
          const fileName = `${email}.jpg`;
          callback(null, fileName);
        },
      }),
    }),
  )
  async create(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    createRestaurantDto.image = image;

    const { location } = createRestaurantDto;

    if (location) {
      const newLocation: CreateLocationDto = await this.locationService.create(
        location,
      );
      createRestaurantDto.location = newLocation;
    }

    return this.restaurantService.create(createRestaurantDto);
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

  @Post('getByCity')
  async getRestaurantsByCity(
    @Body('city') city: string,
  ): Promise<Restaurant[]> {
    return this.locationService.getRestaurantsByCity(city);
  }
}
