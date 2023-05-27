import { Delivery } from 'src/api/delivery/entities/delivery-entity';
import { Food } from 'src/api/food/entities/food-entity';
import { Restaurant } from 'src/api/restaurant/entities/restaurant-entity';
import { User } from 'src/api/user/entities/user.entity';
import { BaseEntity } from 'src/common/db/customBaseEntites/BaseEntity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';

@Entity({ name: 'order' })
export class Order extends BaseEntity {

  @Column({ nullable: true })
  arrivalTime: Date

  @Column({ nullable: true })
  price: string

  @Column({ nullable: true })
  orderConfimation: boolean

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => Food, (food) => food.order)
  foods: Food;

  @ManyToOne(() => Restaurant, (restuarant) => restuarant.orders)
  restaurant: Restaurant;

  @OneToMany(() => Delivery, (delivery) => delivery.orders)
  delivery: Delivery; 
}
