import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../typeorm';
import { Repository } from 'typeorm';
import { UsersDto } from '../../dtos/users/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUser: UsersDto) {
    const newUser = await this.userRepository.create(createUser);
    return this.userRepository.upsert(newUser, ['id']);
  }

  findUsersById(id: number) {
    return this.userRepository.findOneBy({ id: id });
  }

  getUsers() {
    return this.userRepository.find();
  }
}
