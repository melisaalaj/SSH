import { Food } from 'src/api/food/entities/food-entity';
import { BaseEntity } from 'src/common/db/customBaseEntites/BaseEntity';
import { Entity, OneToMany } from 'typeorm';

@Entity()
export class Review extends BaseEntity {

  @OneToMany(() => Food, (food) => food.order)
  food: Food[];

}
