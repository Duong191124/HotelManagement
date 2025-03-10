import { Body, Controller, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CreatedBookingDTO } from './dto/create-booking.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('booking')
@ApiBearerAuth()
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post()
  async bookingRoom(
    @Body() body: CreatedBookingDTO
  ) {
    return this.bookingService.bookingRoom(body);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Patch(':id/status')
  async updateBooking(@Param('id') bookingId: number) {
    return this.bookingService.updateBookingRoom(bookingId);
  }
}
