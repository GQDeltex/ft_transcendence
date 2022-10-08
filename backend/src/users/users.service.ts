import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { Repository, QueryFailedError, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    return this.userRepository.insert(createUserInput);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(identifier: number | string): Promise<User | null> {
    if (typeof identifier == 'number')
      return this.userRepository.findOneBy({ id: identifier });
    else return this.userRepository.findOneBy({ username: identifier });
  }

  async updatePicture(id: number, picture: string): Promise<User | null> {
    const result: UpdateResult = await this.userRepository.update(id, {
      picture: picture,
    });
    if (typeof result.affected != 'undefined' && result.affected < 1)
      throw new QueryFailedError(result.raw, [], 'Cannot find user id');
    return this.userRepository.findOneBy({ id: id });
  }

  async updateUsername(id: number, username: string): Promise<User | null> {
    const result: UpdateResult = await this.userRepository.update(id, {
      username: username,
    });
    if (typeof result.affected != 'undefined' && result.affected < 1)
      throw new QueryFailedError(result.raw, [], 'Cannot find user id');
    return this.userRepository.findOneBy({ id: id });
  }
}
