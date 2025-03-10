import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProviders } from './common/database/database.provider';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { RoleModule } from './module/role/role.module';
import { PermissionModule } from './module/permission/permission.module';
import { RoomModule } from './module/room/room.module';
import { HotelModule } from './module/hotel/hotel.module';
import { HotelLocationModule } from './module/hotel_location/hotel_location.module';
import { RatingModule } from './module/rating/rating.module';
import { NotificationModule } from './module/notification/notification.module';
import { BookingModule } from './module/booking/booking.module';
import { ScheduleModule } from '@nestjs/schedule';
import { InvoiceModule } from './module/invoice/invoice.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './module/email/email.service';
import { DiscountModule } from './module/discount/discount.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>('SMTP_HOST'),
          port: config.get<number>('SMTP_PORT'),
          auth: {
            user: config.get<string>('SMTP_USER'),
            pass: config.get<string>('SMTP_PASSWORD'),
          },
        },
        defaults: {
          from: config.get<string>('FROM_EMAIL'),
        },
      }),
    }),
    UserModule,
    AuthModule,
    RoleModule,
    PermissionModule,
    RoomModule,
    HotelModule,
    HotelLocationModule,
    RatingModule,
    NotificationModule,
    BookingModule,
    InvoiceModule,
    DiscountModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule { }
