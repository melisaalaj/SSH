import { Restaurant } from 'src/api/restaurant/entities/restaurant-entity';
import { BaseEntity } from 'src/common/db/customBaseEntites/BaseEntity';
import { Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Location extends BaseEntity {
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.locations)
  restaurant: Restaurant;
}
