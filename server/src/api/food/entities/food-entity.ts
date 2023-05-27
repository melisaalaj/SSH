import { Menu } from 'src/api/menu/entities/menu-entity';
import { Order } from 'src/api/order/entities/orders-entity';
import { Photo } from 'src/api/photo/entities/photo-entity';
import { Restaurant } from 'src/api/restaurant/entities/restaurant-entity';
import { Review } from 'src/api/review/entities/review-entity';
import { AuditEntity } from 'src/common/db/customBaseEntites/AuditEntity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { FoodType } from '../enums/food.enum';

@Entity()
export class Food extends AuditEntity {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  price: number;

  @Column({
    type: 'enum',
    enum: FoodType,
    default: FoodType.OTHER,
  })
  type: FoodType;

  @Column({ nullable: true })
  productId: string;

  @ManyToOne(() => Menu, (menu) => menu.foods)
  menu: Menu;

  @OneToMany(() => Photo, (photo) => photo.food, { nullable: true })
  photos?: Photo[];

  @ManyToOne(() => Order, (order) => order.foods, { nullable: true })
  order?: Order;

  @ManyToMany(() => Restaurant, (resturant) => resturant.foods, {
    nullable: true,
  })
  @JoinTable()
  restaurants?: Restaurant[];
}
