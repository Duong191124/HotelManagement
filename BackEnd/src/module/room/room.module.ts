import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { roomProvider } from 'src/common/repository/room.provider';
import { hotelLocationProvider } from 'src/common/repository/hotel_location.provider';
import { imageProvider } from 'src/common/repository/image.provider';
import { discountProvider } from 'src/common/repository/discount.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [RoomController],
  providers: [
    RoomService,
    ...roomProvider,
    ...hotelLocationProvider,
    ...imageProvider,
    ...discountProvider
  ],
  exports: [RoomService]
})
export class RoomModule { }
