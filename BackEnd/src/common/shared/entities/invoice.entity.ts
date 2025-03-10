import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Extend } from "./extend";
import { BookingEntity } from "./booking.entity";
import { UserEntity } from "./user.entity";

@Entity()
export class InvoiceEntity extends Extend {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    invoice_number: string;

    @Column()
    issue_date: string;

    @Column()
    due_date: string;

    @Column()
    total_amount: number;

    @Column()
    final_amount: number;

    @ManyToOne(() => BookingEntity, booking => booking.id)
    @JoinColumn({ name: 'booking_id' })
    booking: BookingEntity;

    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;


    // @ManyToOne(() => BookingEntity, booking => booking.id)
    // @JoinColumn({name: 'booking_id'})
    // booking: BookingEntity;
}