import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

export class Extend {
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}