import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { HotelLocationService } from './hotel_location.service';
import { CreateHotelLocationDto } from './dto/create-hotel_location.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('hotel-location')
@ApiBearerAuth()
export class HotelLocationController {
  constructor(private readonly hotelLocationService: HotelLocationService) { }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createHotelLocationDto: CreateHotelLocationDto) {
    return this.hotelLocationService.create(createHotelLocationDto);
  }
}
