/* eslint-disable prettier/prettier */
import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserGender } from '../enums/userGender.enum';
import { UserRoles } from '../enums/roles.enum';
import { AuditEntity } from '../../../common/db/customBaseEntites/AuditEntity';
import { Order } from '../../../api/order/entities/orders-entity';
import { Contact } from '../../../api/contact/entities/contact-entity';
import { Booking } from '../../../api/booking/entities/booking-entity';
import { Review } from '../../../api/review/entities/review-entity';

@Entity('users')
export class User extends AuditEntity {
  @Column({
    type: 'enum',
    default: UserRoles.USER,
    enum: UserRoles,
  })
  role: UserRoles;

  @Column({ default: false })
  isRoleOverridden: boolean;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  @Exclude()
  hashedRt: string;

  @Column({
    type: 'enum',
    nullable: false,
    enum: UserGender,
    default: UserGender.OTHER,
  })
  gender: UserGender;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  birthdate: Date;

  @Column({ nullable: true })
  public stripeCustomerId: string;
  
  @OneToMany(() => Order, (order) => order.user)
  orders: Order;

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts: Contact[];

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking;
 
  @OneToMany(() => Review, (review) => review.restaurant)
  reviews: Review[];
}
