import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";

export const databaseProviders = [
    {
        provide: 'DATABASE',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                timezone: 'Z',
                synchronize: true, // ❗ Chỉ dùng trong dev, production nên tắt
            });

            return dataSource.initialize();
        },
    },
];