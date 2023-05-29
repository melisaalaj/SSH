import { Booking } from '../../../api/booking/entities/booking-entity';
import { Delivery } from '../../../api/delivery/entities/delivery-entity';
import { Event } from '../../../api/event/entities/event-entity';
import { Food } from '../../../api/food/entities/food-entity';
import { Location } from '../../../api/location/entities/location-entity';
import { Order } from '../../../api/order/entities/orders-entity';
import { Photo } from '../../../api/photo/entities/photo-entity';
import { Product } from '../../../api/product/entities/product-entity';
import { Menu } from '../../../api/menu/entities/menu-entity';
import { BaseEntity } from '../../../common/db/customBaseEntites/BaseEntity';
import { Column, Entity, JoinColumn, ManyToMany, OneToMany } from 'typeorm';
import { Review } from '../../../api/review/entities/review-entity';
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

  @OneToMany(() => Menu, (menu) => menu.restaurant)
  menus: Menu[];
  
  @OneToMany(() => Booking, (booking) => booking.restaurant)
  bookings: Booking[];

  @OneToMany(() => Review, (review) => review.restaurant)
  reviews: Review[];
}
