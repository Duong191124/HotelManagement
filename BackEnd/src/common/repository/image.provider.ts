import { DataSource } from "typeorm";
import { ImageEntity } from "../shared/entities/image.entity";

export const imageProvider = [
    {
        provide: 'IMAGE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ImageEntity),
        inject: ['DATABASE'],
    },
];