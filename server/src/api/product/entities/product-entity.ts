import { Restaurant } from '../../../api/restaurant/entities/restaurant-entity';
import { BaseEntity } from '../../../common/db/customBaseEntites/BaseEntity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.products)
  restaurant: Restaurant;
}
