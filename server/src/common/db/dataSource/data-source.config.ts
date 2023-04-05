/* eslint-disable prettier/prettier */
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
    entities: [],
    migrations: ['dist/common/db/migrations/*.js'],
    logging: 'localhost',
    seeds: [],
  };
  
  export const configNoEntities = {
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port:  5432,
    username: 'postgres',
    password: '190470',
    database: 'food_service',
    synchronize: true,
    entities: [],
    migrations: ['dist/common/db/migrations/*.js'],
    logging: 'localhost',
    seeds: [],
  };
  