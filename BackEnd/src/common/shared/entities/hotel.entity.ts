import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class HotelEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}