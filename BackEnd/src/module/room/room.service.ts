import { Body, ConflictException, HttpCode, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Repository } from 'typeorm';
import { RoomEntity } from 'src/common/shared/entities/room.entity';
import { HotelLocationEntity } from 'src/common/shared/entities/hotel_location.entity';
import { CustomizeException } from 'src/common/shared/exception/customize.exception';
import { ImageEntity } from 'src/common/shared/entities/image.entity';

@Injectable()
export class RoomService {
    constructor(
        @Inject('ROOM_REPOSITORY')
        private readonly roomRepository: Repository<RoomEntity>,
        @Inject('HOTEL_LOCATION_REPOSITORY')
        private readonly hotelLocationRepository: Repository<HotelLocationEntity>,
        @Inject('IMAGE_REPOSITORY')
        private readonly imageRepository: Repository<ImageEntity>
    ) { }

    async getAll() {
        return this.roomRepository.find();
    }

    async create(body: CreateRoomDto): Promise<RoomEntity> {
        const findHotelLocation = await this.hotelLocationRepository.findOneBy({ id: body.hotel_location_id });
        if (!findHotelLocation) {
            throw new CustomizeException(`Hotel with id ${body.hotel_location_id} not found`, 400);
        }
        const existingRoom = await this.roomRepository.findOne({
            where: {
                room_number: body.room_number,
                hotel_location: { id: body.hotel_location_id }
            }
        });

        if (existingRoom) {
            throw new CustomizeException(`Room number ${body.room_number} already exists in this hotel location`, 400);
        }
        const newRoom = this.roomRepository.create({ ...body, hotel_location: findHotelLocation });
        return this.roomRepository.save(newRoom);
    }

    async saveRoomImages(roomId: number, url: string[]) {
        const findRoomId = await this.roomRepository.findOneBy({ id: roomId });
        if (!findRoomId) {
            throw new CustomizeException(`Can not find this roomId ${roomId} in database`, 400);
        }
        const newImages = url.map(url => this.imageRepository.create({
            room: findRoomId,
            url
        }));
        return this.imageRepository.save(newImages);
    }
}
