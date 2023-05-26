import { Food } from 'src/api/food/entities/food-entity';
import { Restaurant } from 'src/api/restaurant/entities/restaurant-entity';
import { BaseEntity } from 'src/common/db/customBaseEntites/BaseEntity';
import { Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Menu extends BaseEntity {

//   @ManyToOne(() => Restaurant, (restaurant) => restaurant.menus)
//   restaurant: Restaurant;

  @OneToMany(() => Food, (food) => food.menus)
  food: Food[];
}
