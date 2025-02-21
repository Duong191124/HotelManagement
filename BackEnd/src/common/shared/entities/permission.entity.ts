import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleEntity } from "./role.entity";

@Entity()
export class PermissionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => RoleEntity, (role) => role.permissions)
    roles: RoleEntity[];
}