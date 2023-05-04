import { Food } from 'src/api/food/entities/food-entity';
import { Restaurant } from 'src/api/restaurant/entities/restaurant-entity';
import { BaseEntity } from 'src/common/db/customBaseEntites/BaseEntity';
import { Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Order extends BaseEntity {
  @ManyToOne(() => Restaurant, (restuarant) => restuarant.orders)
  restaurant: Restaurant;

  @OneToMany(() => Food, (food) => food.order)
  foods: Food[];
}
