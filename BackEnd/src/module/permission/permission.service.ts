import { Inject, Injectable } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { PermissionEntity } from 'src/common/shared/entities/permission.entity';
import { DataSource, Repository, Transaction } from 'typeorm';

@Injectable()
export class PermissionService {

  constructor(
    @Inject('PERMISSION_REPOSITORY')
    private readonly permissionRepository: Repository<PermissionEntity>) { }

  async findAll(): Promise<PermissionEntity[]> {
    return this.permissionRepository.find();
  }

  async create(name: string): Promise<PermissionEntity> {
    const exits = this.permissionRepository.findOneBy({ name });
    if (await exits) {
      throw new ExceptionsHandler();
    }
    const permission = new PermissionEntity();
    permission.name = name;
    const newPermission = this.permissionRepository.create(permission);
    return this.permissionRepository.save(newPermission);
  }
}
