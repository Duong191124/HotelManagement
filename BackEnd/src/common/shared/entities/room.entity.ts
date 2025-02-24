import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ERoomType } from "../enum/room_type.enum";
import { ERoomStatus } from "../enum/room_status.enum";
import { EBedType } from "../enum/bed_type.enum";
import { PartialType } from "@nestjs/mapped-types";
import { Extend } from "./extend";
import { HotelLocationEntity } from "./hotel_location.entity";

@Entity()
export class RoomEntity extends PartialType(Extend) {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    room_number: number;

    @Column()
    room_type: ERoomType;

    @Column()
    price_per_night: number;

    @Column()
    room_status: ERoomStatus;

    @Column()
    floor: number;

    @Column()
    capacity: number;

    @Column()
    bed_type: EBedType;

    @Column()
    description: string;

    @ManyToOne(() => HotelLocationEntity, hotel_location => hotel_location.id)
    @JoinColumn({ name: 'hotel_location_id' })
    hotel_location: HotelLocationEntity

}