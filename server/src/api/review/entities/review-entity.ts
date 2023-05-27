import { Restaurant } from '../../../api/restaurant/entities/restaurant-entity';
import { User } from '../../../api/user/entities/user.entity';
import { BaseEntity } from '../../../common/db/customBaseEntites/BaseEntity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Review extends BaseEntity {
  @Column('decimal', { precision: 10, scale: 1 })
  rating: number;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reviews)
  restaurant: Restaurant;
}
