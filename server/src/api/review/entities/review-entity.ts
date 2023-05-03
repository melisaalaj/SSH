import { Restaurant } from 'src/api/restaurant/entities/restaurant-entity';
import { User } from 'src/api/user/entities/user.entity';
import { BaseEntity } from 'src/common/db/customBaseEntites/BaseEntity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Review extends BaseEntity {
  @Column()
  rating: number;

  @Column()
  description: string;

  @ManyToOne(() => User, user => user.reviews)
  user: User;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reviews)
  restaurant: Restaurant;
}
