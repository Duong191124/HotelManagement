import { DataSource } from "typeorm";
import { RatingEntity } from "../shared/entities/rating.entity";

export const ratingProvider = [
    {
        provide: 'RATING_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(RatingEntity),
        inject: ['DATABASE'],
    },
];