import { DataSource } from "typeorm";
import { FollowEntity } from "../shared/entities/follow.entity";

export const followProvider = [
    {
        provide: 'FOLLOW_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(FollowEntity),
        inject: ['DATABASE'],
    },
];