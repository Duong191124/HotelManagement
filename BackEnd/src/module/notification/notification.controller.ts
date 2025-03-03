import { Controller, Get, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('notification')
@ApiBearerAuth()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get()
  async getAll(
    @Param('userId') userId: number
  ) {
    return this.notificationService.getAll(userId);
  }

}
