import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { PermissionEntity } from "./permission.entity";

@Entity()
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => UserEntity, (user) => user.roles)
    users: UserEntity[];

    @ManyToMany(() => PermissionEntity, (permission) => permission.roles, { cascade: true })
    @JoinTable({
        name: 'permission_role_entity'
    })
    permissions: PermissionEntity[];
}