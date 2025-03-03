import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ENotificationType } from "../enum/notification_type.enum";
import { Extend } from "./extend";
import { UserEntity } from "./user.entity";

@Entity()
export class NotificationEntity extends Extend {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @Column()
    title: string;

    @Column()
    notification_type: ENotificationType;

    @Column()
    is_read: boolean;

    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity
}