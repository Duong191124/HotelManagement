import { DataSource } from "typeorm";
import { BookingEntity } from "../shared/entities/booking.entity";

export const bookingProvider = [
    {
        provide: 'BOOKING_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(BookingEntity),
        inject: ['DATABASE'],
    },
];