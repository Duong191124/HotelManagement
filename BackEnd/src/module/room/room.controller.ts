import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) { }

  @HttpCode(HttpStatus.OK)
  @Get()
  async get() {
    return this.roomService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post()
  async create() {

  }
}
