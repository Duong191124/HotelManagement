import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHotelLocationDto } from './dto/create-hotel_location.dto';
import { UpdateHotelLocationDto } from './dto/update-hotel_location.dto';
import { HotelLocationEntity } from 'src/common/shared/entities/hotel_location.entity';
import { Repository } from 'typeorm';
import { HotelEntity } from 'src/common/shared/entities/hotel.entity';

@Injectable()
export class HotelLocationService {

  constructor(
    @Inject('HOTEL_LOCATION_REPOSITORY')
    private readonly hotelLocationRepository: Repository<HotelLocationEntity>,
    @Inject('HOTEL_REPOSITORY')
    private readonly hotelRepository: Repository<HotelEntity>
  ) { }

  async create(body: CreateHotelLocationDto): Promise<HotelLocationEntity> {
    const findHotel = await this.hotelRepository.findOneBy({ id: body.hotel_id });
    if (!findHotel) {
      throw new NotFoundException(`Hotel with id ${body.hotel_id} not found`);
    }
    const newLocation = this.hotelLocationRepository.create({ ...body, hotel: findHotel });
    return this.hotelLocationRepository.save(newLocation);
  }

}
