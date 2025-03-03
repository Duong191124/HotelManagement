import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { bookingProvider } from 'src/common/repository/booking.provider';
import { userProvider } from 'src/common/repository/user.provider';
import { roomProvider } from 'src/common/repository/room.provider';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [DatabaseModule, NotificationModule],
  controllers: [BookingController],
  providers: [
    BookingService,
    ...bookingProvider,
    ...userProvider,
    ...roomProvider
  ],
  exports: [BookingService]
})
export class BookingModule { }
