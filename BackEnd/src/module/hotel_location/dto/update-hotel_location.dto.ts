import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelLocationDto } from './create-hotel_location.dto';

export class UpdateHotelLocationDto extends PartialType(CreateHotelLocationDto) {}
