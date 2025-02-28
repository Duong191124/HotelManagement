import { ApiProperty } from "@nestjs/swagger";

export class PostRatingDTO {

    @ApiProperty()
    room_id: number;

    @ApiProperty()
    user_id: number;

    @ApiProperty()
    star: number;

    @ApiProperty()
    comment: string;

}