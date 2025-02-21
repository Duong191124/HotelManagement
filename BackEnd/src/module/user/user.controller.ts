import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Public } from 'src/common/until/public.method';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard)
  @Get()
  async getAll() {
    return this.userService.findAll();
  }

  @Public()
  @Post()
  async create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

}
