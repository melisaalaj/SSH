import { Menu } from "src/api/menu/entities/menu-entity";
import { Order } from "src/api/order/entities/orders-entity";
import { Photo } from "src/api/photo/entities/photo-entity";
import { Restaurant } from "src/api/restaurant/entities/restaurant-entity";
import { Review } from "src/api/review/entities/review-entity";
import { AuditEntity } from "src/common/db/customBaseEntites/AuditEntity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { FoodType } from "../enums/food.enum";

@Entity()
export class Food extends AuditEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ 
    type: 'enum',
    enum: FoodType,
    default: FoodType.OTHER 
    })
  type: FoodType;

   @OneToMany(() => Photo, (photo) => photo.food)
   photos: Photo[];

  @ManyToOne(() => Menu, (menu) => menu.food)
  @JoinTable()
  menus: Menu[];

  @ManyToOne(() => Order, (order) => order.foods)
  order: Order;

  @OneToMany(() => Review, (review) => review.food)
  reviews: Review[];

  @ManyToMany(() => Restaurant, (resturant) => resturant.foods)
  @JoinTable()
  restaurants: Restaurant[];
}