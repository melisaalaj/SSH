import 'dotenv/config';
import { User } from 'src/api/user/entities/user.entity';

export const config = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '****',
  database: 'food_service',
  synchronize: true,
  dropSchema: false,
  entities: [process.env.TYPEORM_ENTITIES],
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
