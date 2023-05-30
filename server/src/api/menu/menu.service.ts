import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu-entity';
import { Restaurant } from '../restaurant/entities/restaurant-entity';
import { UpdateMenuWithRestaurantDto } from './dtos/update-menu.dto';
import { Food } from '../food/entities/food-entity';
import { CreateMenuDto } from './dtos/create-menu.dto';

@Injectable()
export class MenuService {
  constructor(@InjectRepository(Menu) private repo: Repository<Menu>) {}

  create(createMenuWithRestaurantDto: CreateMenuDto, res: Restaurant) {
    const menu = this.repo.create({
      ...createMenuWithRestaurantDto,
      restaurant: res,
    });
    return this.repo.save(menu);
  }

  async update(
    id: string,
    updateMenuWithRestaurantDto: UpdateMenuWithRestaurantDto,
  ) {
    const menu = await this.repo.findOne({
      where: { id: parseInt(id, 10) },
      relations: ['foods'],
    });
    if (!menu) {
      throw new NotFoundException('Menu not found');
    }

    if (updateMenuWithRestaurantDto.menu) {
      const { name, foods } = updateMenuWithRestaurantDto.menu;

      if (name) {
        menu.name = name;
      }

      if (foods) {
        menu.foods = foods.map((updateFoodDto) => {
          const food = new Food();
          food.name = updateFoodDto.name;
          food.description = updateFoodDto.description;
          food.price = updateFoodDto.price;
          return food;
        });
      }
    }

    return this.repo.save(menu);
  }

  async remove(id: string) {
    const menu = await this.repo.findOneBy({ id: parseInt(id) });
    if (!menu) {
      throw new NotFoundException('Delivery not found');
    }
    return this.repo.remove(menu);
  }

  async findOne(id: string) {
    if (!id) {
      return null;
    }
    return this.repo.findOne({
      where: { id: parseInt(id) },
      relations: ['restaurant', 'foods'],
    });
  }
}
