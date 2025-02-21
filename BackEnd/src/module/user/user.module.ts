import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/common/shared/entities/user.entity';
import { DatabaseModule } from 'src/common/database/database.module';
import { userProvider } from 'src/common/repository/user.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userProvider],
  exports: [UserService]
})
export class UserModule { }
