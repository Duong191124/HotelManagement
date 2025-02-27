import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CreateRoomDto } from './dto/create-room.dto';
import { Public } from 'src/common/until/public.method';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) { }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Get()
  async get() {
    return this.roomService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() body: CreateRoomDto) {
    return this.roomService.create(body);
  }
}
