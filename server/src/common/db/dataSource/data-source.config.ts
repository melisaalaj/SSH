import 'dotenv/config';
import { Contact } from 'src/api/contact/entities/contact-entity';
import { Delivery } from 'src/api/delivery/entities/delivery-entity';
import { Event } from 'src/api/event/entities/event-entity';
import { Food } from 'src/api/food/entities/food-entity';
import { Location } from 'src/api/location/entities/location-entity';
import { Menu } from 'src/api/menu/entities/menu-entity';
import { Order } from 'src/api/order/entities/orders-entity';
import { Photo } from 'src/api/photo/entities/photo-entity';
import { Product } from 'src/api/product/entities/product-entity';
import { Restaurant } from 'src/api/restaurant/entities/restaurant-entity';
import { Review } from 'src/api/review/entities/review-entity';
import { User } from 'src/api/user/entities/user.entity';
import { Delivery } from 'src/api/delivery/entities/delivery-entity';
import { Food } from 'src/api/food/entities/food-entity';
import { Location } from 'src/api/location/entities/location-entity';
import { Menu } from 'src/api/menu/entities/menu-entity';
import { Order } from 'src/api/order/entities/orders-entity';
import { Photo } from 'src/api/photo/entities/photo-entity';
import { Product } from 'src/api/product/entities/product-entity';
import { Restaurant } from 'src/api/restaurant/entities/restaurant-entity';
import { Review } from 'src/api/review/entities/review-entity';
import { User } from 'src/api/user/entities/user.entity';
import { Event } from 'src/api/event/entities/event-entity';


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
  entities: [Delivery, Event, Food, Menu, Order, Photo, Product, Restaurant, Review, Location, User],
  entities: [
    User,
    Delivery,
    Event,
    Food,
    Location,
    Menu,
    Order,
    Photo,
    Product,
    Restaurant,
    Review,
  ],
  migrations: [process.env.TYPEORM_MIGRATIONS],
  logging: process.env.NODE_ENV === 'localhost',
  seeds: process.env.TYPEORM_SEEDING_SEEDS,
};

export const configNoEntities = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '****',
  database: 'food_service',
  synchronize: true,
  entities: [User],
  migrations: ['dist/common/db/migrations/*.js'],
  logging: 'localhost',
  seeds: [],
};
