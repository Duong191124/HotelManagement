import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { roleProvider } from 'src/common/repository/role.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [RoleController],
  providers: [RoleService, ...roleProvider],
  exports: [RoleService]
})
export class RoleModule { }
