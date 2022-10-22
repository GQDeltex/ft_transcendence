import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { EntityNotFoundError, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AllowedUpdateFriendshipMethod } from './dto/update-friendship.input';
import { UserInputError } from 'apollo-server-express';
import { ChannelUser } from '../prc/channel/channel-user/entities/channeluser.entity';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    return this.userRepository.insert(createUserInput);
  }

  findUserChannelList(identifier: number | string): Promise<User> {
    if (typeof identifier == 'number')
      return this.userRepository.findOneOrFail({
        where: { id: identifier },
        relations: ['channelList'],
      });
    else
      return this.userRepository.findOneOrFail({
        where: { username: identifier },
        relations: ['channelList'],
      });
  }

  async findChannelUser(
    identifier: number | string,
    channelName: string,
  ): Promise<ChannelUser> {
    const result: ChannelUser | undefined = await (
      await this.findUserChannelList(identifier)
    ).channelList?.find(
      (channelUser) => channelUser.channel_name === channelName,
    );
    if (typeof result === 'undefined')
      throw new WsException('User not in ' + channelName);
    return result;
  }

  isInChannel(user: User, channel_name: string): boolean {
    const result = user.channelList?.some(
      (channelUser) => channelUser.channel_name === channel_name,
    );
    if (typeof result === 'undefined' || !result) return false;
    return true;
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

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['following', 'followers'] });
  }

  async findOne(identifier: number | string): Promise<User> {
    if (typeof identifier == 'undefined')
      throw new EntityNotFoundError(User, {});

    let query: { id?: number; username?: string };
    if (typeof identifier == 'number') query = { id: identifier };
    else query = { username: identifier };

    return this.userRepository.findOneOrFail({
      where: query,
      relations: ['following', 'followers'],
    });
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

  async updateFriendship(
    id: number,
    method: AllowedUpdateFriendshipMethod,
    friendId: number,
  ): Promise<void> {
    if (id === friendId)
      throw new UserInputError('You cannot send a friend request to yourself');
    const users: User[] = await this.userRepository.find({
      where: [{ id }, { id: friendId }],
      relations: ['following', 'followers'],
    });
    const user: User | undefined = users.find((user) => user.id === id);
    const friend: User | undefined = users.find((user) => user.id === friendId);
    if (typeof user == 'undefined') {
      throw new EntityNotFoundError(User, id);
    }
    if (typeof friend == 'undefined') {
      throw new EntityNotFoundError(User, friendId);
    }

    if (method === AllowedUpdateFriendshipMethod.ADD) {
      if (
        user.following.some((following) => following.id === friendId) ||
        friend.following.some((following) => following.id === id)
      )
        throw new UserInputError('Failed to send friend request');

      user.following.push(friend);
      await this.userRepository.save(user);
    }

    if (method === AllowedUpdateFriendshipMethod.REMOVE) {
      if (
        !user.following.some((following) => following.id === friendId) ||
        !friend.following.some((following) => following.id === id)
      )
        throw new UserInputError('Failed to remove friend');

      user.following = user.following.filter(
        (following) => following.id !== friendId,
      );
      friend.following = friend.following.filter(
        (following) => following.id !== id,
      );
      await this.userRepository.save([friend, user]);
    }

    if (method === AllowedUpdateFriendshipMethod.ACCEPT) {
      if (
        user.following.some((following) => following.id === friendId) ||
        !friend.following.some((following) => following.id === id)
      ) {
        throw new UserInputError('Failed to accept friend request');
      }
      user.following.push(friend);
      await this.userRepository.save(user);
    }

    if (method === AllowedUpdateFriendshipMethod.DECLINE) {
      if (
        user.following.some((following) => following.id === friendId) ||
        !friend.following.some((following) => following.id === id)
      )
        throw new UserInputError('Failed to decline friend request');

      friend.following = friend.following.filter(
        (following) => following.id !== id,
      );
      await this.userRepository.save(friend);
    }

    if (method === AllowedUpdateFriendshipMethod.CANCEL) {
      if (
        !user.following.some((following) => following.id === friendId) ||
        friend.following.some((following) => following.id === id)
      ) {
        throw new UserInputError('Failed to cancel friend request');
      }
      user.following = user.following.filter(
        (following) => following.id !== friendId,
      );
      await this.userRepository.save(user);
    }
  }
}
