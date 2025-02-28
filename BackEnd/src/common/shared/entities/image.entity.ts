import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoomEntity } from "./room.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class ImageEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ApiProperty()
    url: string;

    @ManyToOne(() => RoomEntity, room => room.id, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: 'room_id' })
    @ApiProperty()
    room: RoomEntity;
}