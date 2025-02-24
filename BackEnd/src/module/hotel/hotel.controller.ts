import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) { }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelService.create(createHotelDto);
  }
}
