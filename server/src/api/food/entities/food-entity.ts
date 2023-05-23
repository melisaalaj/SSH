import { Restaurant } from 'src/api/restaurant/entities/restaurant-entity';
import { BaseEntity } from 'src/common/db/customBaseEntites/BaseEntity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Food extends BaseEntity {
  @ManyToMany(() => Restaurant, (resturant) => resturant.foods)
  @JoinTable()
  restaurants: Restaurant[];
}
