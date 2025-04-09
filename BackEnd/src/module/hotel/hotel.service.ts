import { Inject, Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Repository } from 'typeorm';
import { HotelEntity } from 'src/common/shared/entities/hotel.entity';

@Injectable()
export class HotelService {

  constructor(
    @Inject('HOTEL_REPOSITORY')
    private readonly hotelRepository: Repository<HotelEntity>
  ) { }

  async create(body: CreateHotelDto): Promise<HotelEntity> {
    const newHotel = this.hotelRepository.create(body);
    return this.hotelRepository.save(newHotel);
  }
}
