import { DataSource } from "typeorm";
import { HotelEntity } from "../shared/entities/hotel.entity";

export const hotelProvider = [
    {
        provide: 'HOTEL_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(HotelEntity),
        inject: ['DATABASE'],
    },
];