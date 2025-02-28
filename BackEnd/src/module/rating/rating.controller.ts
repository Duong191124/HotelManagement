import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { RatingService } from './rating.service';
import { Public } from 'src/common/until/public.method';
import { AuthGuard } from '../auth/guard/auth.guard';
import { PostRatingDTO } from './dto/rating-post.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FollowRoomDTO } from './dto/follow-room.dto';

@Controller('rating')
@ApiBearerAuth()
export class RatingController {
  constructor(
    private readonly ratingService: RatingService
  ) { }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get(':roomId/get-rating')
  async getRatingByRoomId(
    @Param('roomId') roomId: number,
  ) {
    return await this.ratingService.getRatingsByRoomId(roomId);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post()
  async postRating(@Body() body: PostRatingDTO) {
    return await this.ratingService.postRating(body);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get(':userId/get-follow')
  async getFollowByUserId(@Param('userId') userId: number) {
    return await this.ratingService.getFollowByUserId(userId);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('follow')
  async followRoom(@Body() body: FollowRoomDTO) {
    return await this.ratingService.followRoom(body);
  }
}
