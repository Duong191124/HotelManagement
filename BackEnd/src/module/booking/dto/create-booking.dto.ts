import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";
// import * as moment from 'moment';
import * as moment from 'moment-timezone';


export class CreatedBookingDTO {
    @ApiProperty()
    check_in_date: string;

    @ApiProperty()
    check_out_date: string;

    @ApiProperty()
    room_id: number;

    @ApiProperty()
    user_id: number;

}