import { Food } from "src/api/food/entities/food-entity";
import { Location } from "src/api/location/entities/location-entity";
import { Order } from "src/api/order/entities/orders-entity";
import { Photo } from "src/api/photo/entities/photo-entity";
import { Product } from "src/api/product/entities/product-entity";
import { BaseEntity } from "src/common/db/customBaseEntites/BaseEntity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Url } from "url";

@Entity()
export class Restaurant extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Photo, (photo) => photo.restaurant )
  photos: Photo[]

  @ManyToMany(() => Food, (food) => food.restaurants)
  foods: Food[];

  @OneToMany(() => Location, (location) => location.restaurant)
  locations: Location[];

  @OneToMany(() => Order, (order) => order.restaurant)
  orders: Order[]

  @OneToMany(() => Product, (product) => product.restaurant) 
  products: Product[]
}