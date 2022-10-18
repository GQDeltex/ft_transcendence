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

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(identifier: number | string): Promise<User> {
    if (typeof identifier == 'number')
      return this.userRepository.findOneByOrFail({ id: identifier });
    else return this.userRepository.findOneByOrFail({ username: identifier });
  }

  findUserChannelList(identifier: number | string): Promise<User> {
    if (typeof identifier == 'number')
      return this.userRepository.findOneOrFail({ where: {id: identifier}, relations: ['channelList', 'channelList.channel'] });
    else return this.userRepository.findOneOrFail({ where: {username: identifier}, relations: ['channelList', 'channelList.channel'] });
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

  async updateSocketId(
    identification: number | string,
    socketId: string,
  ): Promise<void> {
    const searchOptions: { id?: number; socketId?: string } = {};
    if (typeof identification === 'number') searchOptions.id = identification;
    else searchOptions.socketId = identification;
    const result: UpdateResult = await this.userRepository.update(
      searchOptions,
      { socketId },
    );
    if (typeof result.affected != 'undefined' && result.affected < 1)
      throw new EntityNotFoundError(User, searchOptions);
  }

  async updateStatus(
    identification: number | string,
    status: string,
  ): Promise<void> {
    const searchOptions: { id?: number; socketId?: string } = {};
    if (typeof identification === 'number') searchOptions.id = identification;
    else searchOptions.socketId = identification;
    const result: UpdateResult = await this.userRepository.update(
      searchOptions,
      {
        status,
      },
    );
    if (typeof result.affected != 'undefined' && result.affected < 1)
      throw new EntityNotFoundError(User, searchOptions);
  }
}
