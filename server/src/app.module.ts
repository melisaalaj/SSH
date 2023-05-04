/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { config } from './common/db/dataSource/data-source.config';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { RestaurantModule } from './api/restaurant/restaurant.module';
import { PhotoModule } from './api/photo/photo.module';
import { LocationModule } from './api/location/location.module';
import { FoodModule } from './api/food/food.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config as DataSourceOptions),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    UserModule,
    AuthModule,
    RestaurantModule,
    PhotoModule,
    LocationModule,
    FoodModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
