import { DataSource } from "typeorm";
import { UserEntity } from "../shared/entities/user.entity";

export const userProvider = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
        inject: ['DATABASE'],
    },
];