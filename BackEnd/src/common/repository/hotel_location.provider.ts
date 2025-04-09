import { DataSource } from "typeorm";
import { HotelLocationEntity } from "../shared/entities/hotel_location.entity";

export const hotelLocationProvider = [
    {
        provide: 'HOTEL_LOCATION_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(HotelLocationEntity),
        inject: ['DATABASE'],
    },
];