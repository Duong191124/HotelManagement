import { ApiProperty } from "@nestjs/swagger";

export class FollowRoomDTO {
    @ApiProperty()
    room_id: number;

    @ApiProperty()
    user_id: number;
}