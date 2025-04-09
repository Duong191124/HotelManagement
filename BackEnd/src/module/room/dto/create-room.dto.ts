import { EBedType } from "src/common/shared/enum/bed_type.enum";
import { ERoomStatus } from "src/common/shared/enum/room_status.enum";
import { ERoomType } from "src/common/shared/enum/room_type.enum";

export class CreateRoomDto {

    room_number: number;
    room_type: ERoomType;
    price_per_night: number;
    room_status: ERoomStatus;
    floor: number;
    capacity: number;
    bed_type: EBedType;
    description: string;
    hotel_location_id: number;
}
