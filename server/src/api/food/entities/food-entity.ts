import { Menu } from '../../../api/menu/entities/menu-entity';
import { Order } from '../../../api/order/entities/orders-entity';
import { Photo } from '../../../api/photo/entities/photo-entity';
import { Restaurant } from '../../../api/restaurant/entities/restaurant-entity';
import { AuditEntity } from '../../../common/db/customBaseEntites/AuditEntity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Food extends AuditEntity {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  price: number;

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
