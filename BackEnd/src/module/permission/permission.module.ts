import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { permissionProvider } from 'src/common/repository/permission.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [PermissionController],
  providers: [PermissionService, ...permissionProvider],
  exports: [PermissionService]
})
export class PermissionModule { }
