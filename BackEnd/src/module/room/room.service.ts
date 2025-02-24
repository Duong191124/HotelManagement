import { Inject, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Repository } from 'typeorm';
import { RoomEntity } from 'src/common/shared/entities/room.entity';

@Injectable()
export class RoomService {
    constructor(
        @Inject('ROOM_REPOSITORY')
        private readonly roomRepository: Repository<RoomEntity>
    ) { }

    async getAll() {
        return this.roomRepository.find();
    }

    async create() {

    }
}
