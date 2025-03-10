import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EBookingStatus } from "../enum/booking_status.enum";
import { EPaymentStatus } from "../enum/payment_status.enum";
import { Extend } from "./extend";
import { UserEntity } from "./user.entity";
import { RoomEntity } from "./room.entity";

@Entity()
export class BookingEntity extends Extend {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    check_in_date: string;

    @Column()
    check_out_date: string;


    @Column()
    total_price: number;

    @Column({
        type: 'boolean',
        default: false
    })
    is_expired: boolean;

    @Column({
        type: 'enum',
        enum: EBookingStatus,
        default: EBookingStatus.BOOKING_REQUEST
    })
    status: EBookingStatus;

    @Column({
        type: 'enum',
        enum: EPaymentStatus,
        default: EPaymentStatus.UNPAID
    })
    payment_status: EPaymentStatus;

    @ManyToOne(() => UserEntity, user => user.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => RoomEntity, room => room.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'room_id' })
    room: RoomEntity;
}