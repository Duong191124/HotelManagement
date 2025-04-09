import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { HotelEntity } from "./hotel.entity";

@Entity()
export class HotelLocationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    location: string;

    @ManyToOne(() => HotelEntity, hotel => hotel.id)
    @JoinColumn({ name: 'hotel_id' })
    hotel: HotelEntity
}