import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/common/shared/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { encodingPassword } from 'src/common/until/bcrypt';

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
    const newCustomer = this.userRepository.create({ ...body, password });
    return this.userRepository.save(newCustomer);
  }

  async findOne(username: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ username });
  }
}
