import { Food } from 'src/api/food/entities/food-entity';
import { Restaurant } from 'src/api/restaurant/entities/restaurant-entity';
import { BaseEntity } from 'src/common/db/customBaseEntites/BaseEntity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Photo extends BaseEntity {
  @Column()
  filename: string;

  @Column({
    type: 'bytea',
  })
  data: Uint8Array;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.photos)
  restaurant: Restaurant;

  @ManyToOne(() => Food, (food) => food.photos)
   food: Food[];
}
