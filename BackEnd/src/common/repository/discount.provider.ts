import { DataSource } from "typeorm";
import { DiscountEntity } from "../shared/entities/discount.entity";

export const discountProvider = [
    {
        provide: 'DISCOUNT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(DiscountEntity),
        inject: ['DATABASE'],
    },
];