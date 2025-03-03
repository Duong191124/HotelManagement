import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { notificationProvider } from 'src/common/repository/notification.provider';
import { userProvider } from 'src/common/repository/user.provider';
import { NotificationGateway } from 'src/common/until/notification-gateway';
import { roomProvider } from 'src/common/repository/room.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    NotificationGateway,
    ...notificationProvider,
    ...userProvider,
    ...roomProvider
  ],
  exports: [NotificationService]
})
export class NotificationModule { }
