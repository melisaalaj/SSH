import { Booking } from '../../../api/booking/entities/booking-entity';
import { Delivery } from '../../../api/delivery/entities/delivery-entity';
import { Event } from '../../../api/event/entities/event-entity';
import { Location } from '../../../api/location/entities/location-entity';
import { Order } from '../../../api/order/entities/orders-entity';
import { Photo } from '../../../api/photo/entities/photo-entity';
import { Menu } from '../../../api/menu/entities/menu-entity';
import { BaseEntity } from '../../../common/db/customBaseEntites/BaseEntity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { Review } from '../../../api/review/entities/review-entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsUnique } from 'src/common/decorators/validation.decorator';

@Entity()
export class Restaurant extends BaseEntity {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;

  @JoinColumn({ name: 'photoId' })
  @OneToMany(() => Photo, (photo) => photo.restaurant, { nullable: true })
  photos?: Photo[];

  @OneToMany(() => Location, (location) => location.restaurant)
  locations: Location[];

  @OneToMany(() => Order, (order) => order.restaurant)
  orders: Order[];

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
