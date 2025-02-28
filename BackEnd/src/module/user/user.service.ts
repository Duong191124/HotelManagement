import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/common/shared/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { comparingPassword, encodingPassword } from 'src/common/until/bcrypt';
import { CustomizeException } from 'src/common/shared/exception/customize.exception';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async create(body: CreateUserDto): Promise<UserEntity> {
    const password = encodingPassword(body.password);
    const re_password = comparingPassword(body.re_password, password);
    if (!re_password) {
      throw new CustomizeException("Re_password not match", 400);
    }
    const newCustomer = this.userRepository.create({ ...body, password });
    return this.userRepository.save(newCustomer);
  }

  async findOne(username: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ username });
  }
}
