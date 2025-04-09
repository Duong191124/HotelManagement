import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { RoomService } from './room.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CreateRoomDto } from './dto/create-room.dto';
import { Public } from 'src/common/until/public.method';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CustomizeException } from 'src/common/shared/exception/customize.exception';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam } from '@nestjs/swagger';

@Controller('room')
@ApiBearerAuth()
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

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post(':roomId/upload-images')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads/rooms',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new CustomizeException('Only image files are allowed!', 400), false);
        }
        callback(null, true);
      },
    }),
  )
  @ApiParam({ name: 'roomId', type: 'number', description: 'ID của phòng' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  async uploadRoomImages(
    @Param('roomId') roomId: number,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!roomId) {
      throw new CustomizeException('Room ID is required', 400);
    }

    const filePaths = files.map(file => `/uploads/rooms/${file.filename}`);

    await this.roomService.saveRoomImages(roomId, filePaths);

    return {
      message: 'Images uploaded successfully!',
      roomId,
      files: filePaths,
    };
  }


}
