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
    const newUser = this.userRepository.create(createUserInput);
    return this.userRepository.upsert(newUser, ['id']);
  }

  async set2FASecret(secret: string, userId: number) {
    return this.userRepository.update(userId, {
      twoFASecret: secret,
    });
  }

  async set2FAEnable(enabled: boolean, userId: number) {
    return this.userRepository.update(userId, {
      twoFAEnable: enabled,
    });
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(identifier: number | string) {
    if (typeof identifier == 'number')
      return this.userRepository.findOneBy({ id: identifier });
    else return this.userRepository.findOneBy({ username: identifier });
  }

  async updatePicture(id: number, picture: string) {
    await this.userRepository.update(id, { picture: picture });
    return this.findOne(id);
  }

  async updateUsername(id: number, username: string) {
    await this.userRepository.update(id, { username: username });
    return this.findOne(id);
  }
}
