import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";
// import * as moment from 'moment';
import * as moment from 'moment-timezone';


export class CreatedBookingDTO {
    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Date)
    @Transform(({ value }) => moment(value, 'DD/MM/YYYY HH:mm:ss').tz('UTC').toDate())
    @IsDate()
    check_in_date: Date;

    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Date)
    @Transform(({ value }) => moment(value, 'DD/MM/YYYY HH:mm:ss').tz('UTC').toDate())
    @IsDate()
    check_out_date: Date;

    @ApiProperty()
    total_price: number;

    @ApiProperty()
    room_id: number;

    @ApiProperty()
    user_id: number;

}