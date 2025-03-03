import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProviders } from './common/database/database.provider';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { RoleModule } from './module/role/role.module';
import { PermissionModule } from './module/permission/permission.module';
import { RoomModule } from './module/room/room.module';
import { HotelModule } from './module/hotel/hotel.module';
import { HotelLocationModule } from './module/hotel_location/hotel_location.module';
import { RatingModule } from './module/rating/rating.module';
import { FileInterceptor } from '@nestjs/platform-express';
import { NotificationModule } from './module/notification/notification.module';
import { BookingModule } from './module/booking/booking.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
