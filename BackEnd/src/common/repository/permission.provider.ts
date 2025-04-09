import { DataSource } from "typeorm";
import { PermissionEntity } from "../shared/entities/permission.entity";

export const permissionProvider = [
    {
        provide: 'PERMISSION_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(PermissionEntity),
        inject: ['DATABASE'],
    },
];