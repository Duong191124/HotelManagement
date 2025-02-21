import { Inject, Injectable } from '@nestjs/common';
import { RoleEntity } from 'src/common/shared/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
    constructor(
        @Inject('ROLE_REPOSITORY')
        private readonly roleRepository: Repository<RoleEntity>,
    ) { }

    async findAll(): Promise<RoleEntity[]> {
        return this.roleRepository.find();
    }

    // async create(name: string): Promise<RoleEntity> {
    //     const newRole = this.roleRepository.create(name);
    //     return this.roleRepository.save(newRole);
    // }

}
