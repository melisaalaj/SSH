import { Food } from '../../../api/food/entities/food-entity';
import { Restaurant } from '../../../api/restaurant/entities/restaurant-entity';
import { BaseEntity } from '../../../common/db/customBaseEntites/BaseEntity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Photo extends BaseEntity {
  @Column({nullable: true})
  filename: string;

  @Column({
    type: 'bytea',
    nullable: true
  })
  data: Buffer;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.photos)
  restaurant: Restaurant;

  @ManyToOne(() => Food, (food) => food.photos)
   food: Food[];
}
