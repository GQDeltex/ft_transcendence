import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    this.userRepository.upsert(createUserInput, ['id']);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(identifier: number | string): Promise<User | null> {
    if (typeof identifier == 'number')
      return this.userRepository.findOneBy({ id: identifier });
    else return this.userRepository.findOneBy({ username: identifier });
  }

  updatePicture(id: number, picture: string) {
    this.userRepository.update(id, { picture: picture });
  }

  updateUsername(id: number, username: string) {
    this.userRepository.update(id, { username: username });
  }
}
