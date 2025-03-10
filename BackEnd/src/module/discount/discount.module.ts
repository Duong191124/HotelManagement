import { Module } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { discountProvider } from 'src/common/repository/discount.provider';
import { userProvider } from 'src/common/repository/user.provider';
import { ratingProvider } from 'src/common/repository/rating.provider';
import { NotificationModule } from '../notification/notification.module';
import { roomProvider } from 'src/common/repository/room.provider';
import { RoomModule } from '../room/room.module';

@Module({
  imports: [DatabaseModule, NotificationModule, RoomModule],
  controllers: [DiscountController],
  providers: [
    DiscountService,
    ...discountProvider,
    ...ratingProvider,
    ...userProvider
  ],
  exports: [DiscountService]
})
export class DiscountModule { }
