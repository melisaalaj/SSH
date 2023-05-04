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


@Module({
  imports: [
    TypeOrmModule.forRoot(config as DataSourceOptions),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'food.service808@gmail.com',
          pass: 'DishDash808',
        },
      },
      defaults: {
        from: 'food.service808@gmail.com',
      },
      template: {
        dir: __dirname + '/../templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    NestEmitterModule.forRoot(new EventEmitter()),
    UserModule,
    AuthModule,
    RestaurantModule,
    PhotoModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
