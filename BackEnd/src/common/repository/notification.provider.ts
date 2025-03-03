import { DataSource } from "typeorm";
import { NotificationEntity } from "../shared/entities/notification.entity";

export const notificationProvider = [
    {
        provide: 'NOTIFICATION_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(NotificationEntity),
        inject: ['DATABASE'],
    },
];