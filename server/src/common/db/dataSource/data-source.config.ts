
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

export const config = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Leona.456',
  database: 'food_service',
  synchronize: true,
  dropSchema: false,
  entities: [User, Restaurant, Food, Order, Product, Location, Photo, Review, Menu, Delivery],
  migrations: ['dist/common/db/migrations/*.js'],
  logging: 'localhost',
  seeds: [],
};

export const configNoEntities = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Leona.456',
  database: 'food_service',
  synchronize: true,
  entities: [User, Restaurant, Food, Order, Product, Location, Photo, Review, Menu, Delivery],
  migrations: ['dist/common/db/migrations/*.js'],
  logging: 'localhost',
  seeds: [],
};
