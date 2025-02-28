import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoomEntity } from "./room.entity";
import { Extend } from "./extend";
import { UserEntity } from "./user.entity";

@Entity()
export class RatingEntity extends Extend {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    star: number;

    @Column()
    comment: string;

    @ManyToOne(() => RoomEntity, room => room.id, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: 'room_id' })
    room: RoomEntity;

    @ManyToOne(() => UserEntity, user => user.id, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
}