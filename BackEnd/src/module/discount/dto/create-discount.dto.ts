import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";
import moment from "moment";

export class CreateDiscountDTO {
    @ApiProperty()
    name: string;

    @ApiProperty()
    value: number;

    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Date)
    @Transform(({ value }) => moment(value, 'DD/MM/YYYY HH:mm:ss', true).tz('UTC').toDate())
    @IsDate()
    expired_date: string
}