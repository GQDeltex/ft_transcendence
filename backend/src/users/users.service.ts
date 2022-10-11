import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { Repository, EntityNotFoundError, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    return this.userRepository.insert(createUserInput);
  }

  async update2FASecret(id: number, secret: string): Promise<void> {
    const result: UpdateResult = await this.userRepository.update(id, {
      twoFASecret: secret,
    });
    if (typeof result.affected != 'undefined' && result.affected < 1)
      throw new EntityNotFoundError(User, { id: id });
  }

  async update2FAEnable(id: number, enabled: boolean): Promise<void> {
    const result: UpdateResult = await this.userRepository.update(id, {
      twoFAEnable: enabled,
    });
    if (typeof result.affected != 'undefined' && result.affected < 1)
      throw new EntityNotFoundError(User, { id: id });
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(identifier: number | string): Promise<User | null> {
    if (typeof identifier == 'number')
      return this.userRepository.findOneByOrFail({ id: identifier });
    else return this.userRepository.findOneByOrFail({ username: identifier });
  }

  async updatePicture(id: number, picture: string): Promise<void> {
    const result: UpdateResult = await this.userRepository.update(id, {
      picture: picture,
    });
    if (typeof result.affected != 'undefined' && result.affected < 1)
      throw new EntityNotFoundError(User, { id: id });
  }

  async updateUsername(id: number, username: string): Promise<void> {
    const result: UpdateResult = await this.userRepository.update(id, {
      username: username,
    });
    if (typeof result.affected != 'undefined' && result.affected < 1)
      throw new EntityNotFoundError(User, { id: id });
  }

  async updateSocketId(id: number, socketId: string): Promise<void> {
    const result: UpdateResult = await this.userRepository.update(id, {
      socketId: socketId,
    });
    if (typeof result.affected != 'undefined' && result.affected < 1)
      throw new EntityNotFoundError(User, { id: id });
  }
}
