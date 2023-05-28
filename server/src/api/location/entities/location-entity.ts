import { Delivery } from '../../../api/delivery/entities/delivery-entity';
import { Restaurant } from '../../../api/restaurant/entities/restaurant-entity';
import { BaseEntity } from '../../../common/db/customBaseEntites/BaseEntity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Location extends BaseEntity {
  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  postalCode: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.locations)
  restaurant: Restaurant;

  @OneToOne(() => Delivery, (delivery) => delivery.location)
  delivery: Delivery[];
}
