import { Restaurant } from '../../../api/restaurant/entities/restaurant-entity';
import { User } from '../../../api/user/entities/user.entity';
import { BaseEntity } from '../../../common/db/customBaseEntites/BaseEntity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BookingStatus } from '../enums/bookingStatus.enum';

@Entity({ name: 'booking' })
export class Booking extends BaseEntity {

  @Column({ nullable: true })
  numberOfPeople: number

  @Column({ nullable: true })
  bookingTime: Date

  @Column({ nullable: true })
  specialRequest: string

  @Column({ 
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING 
    })
  type: BookingStatus;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @ManyToOne(() => Restaurant, (restuarant) => restuarant.bookings)
  restaurant: Restaurant;
 
}
