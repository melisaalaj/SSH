import { Contact } from 'src/api/contact/entities/contact-entity';
import { Delivery } from 'src/api/delivery/entities/delivery-entity';
import { Event } from 'src/api/event/entities/event-entity';
import { Food } from 'src/api/food/entities/food-entity';
import { Location } from 'src/api/location/entities/location-entity';
import { Order } from 'src/api/order/entities/orders-entity';
import { Photo } from 'src/api/photo/entities/photo-entity';
import { Product } from 'src/api/product/entities/product-entity';
import { Review } from 'src/api/review/entities/review-entity';
import { BaseEntity } from 'src/common/db/customBaseEntites/BaseEntity';

import { Column, Entity, JoinColumn, ManyToMany, OneToMany } from 'typeorm';
//import { Delivery } from 'src/api/delivery/entities/delivery-entity';

@Entity()
export class Restaurant extends BaseEntity {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  email: string;

  @JoinColumn({ name: 'photoId' })
  @OneToMany(() => Photo, (photo) => photo.restaurant, { nullable: true })
  photos?: Photo[];

  @ManyToMany(() => Food, (food) => food.restaurants)
  foods: Food[];

  @OneToMany(() => Location, (location) => location.restaurant)
  locations: Location[];

  @OneToMany(() => Order, (order) => order.restaurant)
  orders: Order[];

  @OneToMany(() => Product, (product) => product.restaurant)
  products: Product[];

  @OneToMany(() => Delivery, (delivery) => delivery.restaurant)
  deliveries: Delivery[];

  @OneToMany(() => Event, (event) => event.restaurant)
  events: Event[];

  @OneToMany(() => Review, (review) => review.restaurant)
  reviews: Review[];
}
