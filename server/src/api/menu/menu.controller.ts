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
import { MenuService } from './menu.service';
import { CreateMenuWithRestaurantDto } from './dtos/create-menu.dto';
import { UpdateMenuWithRestaurantDto } from './dtos/update-menu.dto';
import { UserRoles } from '../user/enums/roles.enum';
import { Roles } from 'src/common/decorators/roles.decorato';

  
  @ApiTags('Menu')
  @Controller('Menu')
  export class MenuController {
    constructor(
      private readonly menuService: MenuService,
      private readonly resturantService: RestaurantService,
    ) {}
  
    @Roles(UserRoles.ADMIN)
    @Post('/create/:id')
     async createEvent(
    @Param('id') restaurantId: string,
    @Body() createMenuWithRestaurantDto: CreateMenuWithRestaurantDto,
     ) {
    const restaurant = await this.resturantService.findOne(restaurantId);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    const menu = await this.menuService.create(
      createMenuWithRestaurantDto, 
      restaurant
    );

    return menu;
    }
  
    @Roles(UserRoles.ADMIN)
    @Post('/update/:id')
    async update(@Param('id') id: string, @Body() body: UpdateMenuWithRestaurantDto) {
      return await this.menuService.update(id, body);
    }
  
    @Roles(UserRoles.ADMIN)
    @Delete(':id')
    async remove(@Param('id') id: string) {
      const menu = await this.menuService.findOne(id);
      if (!menu) {
        throw new NotFoundException('Menu not found');
      }
      await this.menuService.remove(id);
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      const menu = await this.menuService.findOne(id);
      if (!menu) {
        throw new NotFoundException('Menu not found');
      }
      return menu;
    }
  }
  