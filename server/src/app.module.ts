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
import { DeliveryModule } from './api/delivery/delivery.module';
import { MailService } from './services/mail/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import EventEmitter from 'events';
import { NestEmitterModule } from 'nest-emitter';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { OrderModule } from './api/order/order.module';
import { MenuModule } from './api/menu/menu.module';
import { EventModule } from './api/event/event.module';
import { ContactModule } from './api/contact/contact.module';
import { BookingModule } from './api/booking/booking.module';
import { ReviewModule } from './api/review/review.module';
import { StripeModule } from './api/stripe/stripe.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config as DataSourceOptions),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_AUTH_USER,
          pass: process.env.MAIL_AUTH_PASSWORD,
        },
      },
      defaults: {
        from: process.env.SENDER_MAIL,
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
    MailerModule,
    RestaurantModule,
    PhotoModule,
    LocationModule,
    FoodModule,
    DeliveryModule,
    OrderModule,
    MenuModule,
    EventModule,
    ContactModule,
    BookingModule,
    ReviewModule,
    StripeModule
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
