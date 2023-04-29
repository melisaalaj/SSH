import { Restaurant } from 'src/api/restaurant/entities/restaurant-entity';
import { BaseEntity } from 'src/common/db/customBaseEntites/BaseEntity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class Photo extends BaseEntity {
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.photos)
  restaurant: Restaurant;
}
