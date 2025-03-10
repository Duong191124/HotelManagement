import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EUser } from "../enum/user.enum";
import { RoleEntity } from "./role.entity";
import { Exclude } from "class-transformer";
import { BookingEntity } from "./booking.entity";
import { RoomEntity } from "./room.entity";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    username: string;

    @Exclude()
    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: EUser,
        default: EUser.ACTIVE
    })
    status: EUser;

    @Column()
    email: string;

    @ManyToMany(() => RoleEntity, (role) => role.users, { cascade: true })
    @JoinTable({
        name: 'user_role_entity'
    })
    roles: RoleEntity[];

    @OneToMany(() => BookingEntity, booking => booking.id)
    booking: BookingEntity;

    @OneToMany(() => RoomEntity, room => room.id)
    room: RoomEntity;
}
