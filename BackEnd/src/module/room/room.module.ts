import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { roomProvider } from 'src/common/repository/room.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [RoomController],
  providers: [RoomService, ...roomProvider],
  exports: [RoomService]
})
export class RoomModule { }
