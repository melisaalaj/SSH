import { Column, Entity, ManyToMany, ManyToOne, OneToOne } from "typeorm";
import { DeliveryType } from "../enums/delivery-type.enum";
import { AuditEntity } from "src/common/db/customBaseEntites/AuditEntity";
import { Order } from "src/api/order/entities/orders-entity";
import { Location } from "src/api/location/entities/location-entity";
import { Restaurant } from "src/api/restaurant/entities/restaurant-entity";


@Entity()
export class Delivery extends AuditEntity {
  @Column({ nullable: true })
  deliveryTime: Date;

  @Column({ 
    type: 'enum',
    enum: DeliveryType,
    default: DeliveryType.DELIVERED 
    })
  type: DeliveryType;

  @ManyToOne(() => Order, (order) => order.delivery)
  orders: Order;

  @OneToOne(() => Location, (location) => location.delivery)
  location: Location;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.deliveries)
  restaurant: Restaurant;  
}