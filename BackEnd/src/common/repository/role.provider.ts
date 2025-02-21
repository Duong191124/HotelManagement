import { DataSource } from "typeorm";
import { RoleEntity } from "../shared/entities/role.entity";

export const roleProvider = [
    {
        provide: 'ROLE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(RoleEntity),
        inject: ['DATABASE'],
    },
];