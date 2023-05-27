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
import { RestaurantModule } from "../restaurant/restaurant.module";
import { PhotoModule } from "../photo/photo.module";
import { FoodModule } from "../food/food.module";


@Module({
  imports: [
    TypeOrmModule.forFeature([Menu]),
    RestaurantModule,
    PhotoModule,
    FoodModule
  ],
  providers: [MenuService],
  controllers: [MenuController],
  exports: [MenuService],
})
export class MenuModule {}
