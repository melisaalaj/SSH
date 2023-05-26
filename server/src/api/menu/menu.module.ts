import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Restaurant } from "../restaurant/entities/restaurant-entity";
import { Photo } from "../photo/entities/photo-entity";
import { Menu } from "./entities/menu-entity";
import { MenuService } from "./menu.service";
import { RestaurantService } from "../restaurant/restaurant.service";
import { PhotoService } from "../photo/photo.service";
import { MenuController } from "./menu.controller";
import { Food } from "../food/entities/food-entity";
import { FoodService } from "../food/food.service";


@Module({
  imports: [
    TypeOrmModule.forFeature([Menu]),
    TypeOrmModule.forFeature([Restaurant]),
    TypeOrmModule.forFeature([Photo]),
    TypeOrmModule.forFeature([Food]),
  ],
  providers: [MenuService, RestaurantService, PhotoService, FoodService],
  controllers: [MenuController],
  exports: [MenuService],
})
export class MenuModule {}
