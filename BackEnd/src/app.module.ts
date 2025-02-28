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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    RoleModule,
    PermissionModule,
    RoomModule,
    HotelModule,
    HotelLocationModule,
    RatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
