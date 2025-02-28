import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { ratingProvider } from 'src/common/repository/rating.provider';
import { followProvider } from 'src/common/repository/follow.provider';
import { roomProvider } from 'src/common/repository/room.provider';
import { userProvider } from 'src/common/repository/user.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [RatingController],
  providers: [
    RatingService,
    ...ratingProvider,
    ...followProvider,
    ...roomProvider,
    ...userProvider
  ],
  exports: [RatingService]
})
export class RatingModule { }
