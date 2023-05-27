import { Column, Entity, ManyToMany, ManyToOne, OneToOne } from 'typeorm';
import { DeliveryType } from '../enums/delivery-type.enum';
import { AuditEntity } from '../../../common/db/customBaseEntites/AuditEntity';
import { Order } from '../../../api/order/entities/orders-entity';
import { Location } from '../../../api/location/entities/location-entity';
import { Restaurant } from '../../../api/restaurant/entities/restaurant-entity';

@Entity()
export class Delivery extends AuditEntity {
  @Column({ nullable: true })
  deliveryTime: Date;

  @Column({
    type: 'enum',
    enum: DeliveryType,
    default: DeliveryType.DELIVERED,
  })
  type: DeliveryType;

  @OneToOne(() => Order, (order) => order.delivery)
  order: Order;

  @OneToOne(() => Location, (location) => location.delivery)
  location: Location;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.deliveries)
  restaurant: Restaurant;
}
