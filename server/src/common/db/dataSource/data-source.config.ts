import { PasswordReset } from 'src/api/user/entities/reset-password.entity';
import { User } from 'src/api/user/entities/user.entity';

export const config = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '190470',
  database: 'food_service',
  synchronize: true,
  dropSchema: false,
  entities: [User, PasswordReset],
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
  password: '190470',
  database: 'food_service',
  synchronize: true,
  entities: [User, PasswordReset],
  migrations: ['dist/common/db/migrations/*.js'],
  logging: 'localhost',
  seeds: [],
};
