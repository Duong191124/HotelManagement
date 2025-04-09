import { Module } from '@nestjs/common';
import { HotelLocationService } from './hotel_location.service';
import { HotelLocationController } from './hotel_location.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { hotelLocationProvider } from 'src/common/repository/hotel_location.provider';
import { hotelProvider } from 'src/common/repository/hotel.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [HotelLocationController],
  providers: [HotelLocationService, ...hotelLocationProvider, ...hotelProvider],
  exports: [HotelLocationService]
})
export class HotelLocationModule { }
