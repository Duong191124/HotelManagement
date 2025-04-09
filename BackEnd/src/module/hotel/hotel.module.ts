import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { hotelProvider } from 'src/common/repository/hotel.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [HotelController],
  providers: [HotelService, ...hotelProvider],
  exports: [HotelService]
})
export class HotelModule { }
