import { DataSource } from "typeorm";
import { InvoiceEntity } from "../shared/entities/invoice.entity";

export const invoiceProvider = [
    {
        provide: 'INVOICE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(InvoiceEntity),
        inject: ['DATABASE'],
    },
];