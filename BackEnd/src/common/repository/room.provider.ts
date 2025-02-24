import { DataSource } from "typeorm";
import { RoomEntity } from "../shared/entities/room.entity";

export const roomProvider = [
    {
        provide: 'ROOM_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(RoomEntity),
        inject: ['DATABASE'],
    },
];