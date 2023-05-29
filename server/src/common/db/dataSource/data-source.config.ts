import 'dotenv/config';
import { Booking } from '../../../api/booking/entities/booking-entity';
import { Contact } from '../../../api/contact/entities/contact-entity';
import { Delivery } from '../../../api/delivery/entities/delivery-entity';
import { Event } from '../../../api/event/entities/event-entity';
import { Food } from '../../../api/food/entities/food-entity';
import { Location } from '../../../api/location/entities/location-entity';
import { Menu } from '../../../api/menu/entities/menu-entity';
import { Order } from '../../../api/order/entities/orders-entity';
import { Photo } from '../../../api/photo/entities/photo-entity';
import { Restaurant } from '../../../api/restaurant/entities/restaurant-entity';
import { Review } from '../../../api/review/entities/review-entity';
import { User } from '../../../api/user/entities/user.entity';

export const config = {
  name: 'default',
  type: process.env.TYPEORM_TYPE,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT || 5432,
  username: process.env.TYPEORM_USER,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_NAME,
  synchronize: true,
  dropSchema: false,
  entities: [
    User,
    Delivery,
    Event,
    Food,
    Location,
    Menu,
    Order,
    Photo,
    Restaurant,
    Review,
    Contact,
    Booking,
  ],
  migrations: [process.env.TYPEORM_MIGRATIONS],
  logging: process.env.NODE_ENV === 'localhost',
  seeds: process.env.TYPEORM_SEEDING_SEEDS,
};

export const configNoEntities = {
  name: 'default',
  type: process.env.TYPEORM_TYPE,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT || 5432,
  username: process.env.TYPEORM_USER,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_NAME,
  synchronize: true,
  entities: [
    User,
    Delivery,
    Event,
    Food,
    Location,
    Menu,
    Order,
    Photo,
    Restaurant,
    Review,
    Contact,
    Booking,
  ],
  migrations: [process.env.TYPEORM_MIGRATIONS],
  logging: process.env.NODE_ENV === 'localhost',
  seeds: process.env.TYPEORM_SEEDING_SEEDS,
};