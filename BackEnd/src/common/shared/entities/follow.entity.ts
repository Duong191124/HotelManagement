import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoomEntity } from "./room.entity";
import { UserEntity } from "./user.entity";
import { Extend } from "./extend";

@Entity()
export class FollowEntity extends Extend {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'boolean',
        default: false
    })
    follow: boolean;

    @ManyToOne(() => RoomEntity, room => room.id, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: 'room_id' })
    room: RoomEntity;

    @ManyToOne(() => UserEntity, user => user.id, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
}