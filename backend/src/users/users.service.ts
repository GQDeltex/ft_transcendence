import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { EntityNotFoundError, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AllowedUpdateFriendshipMethod } from './dto/update-friendship.input';
import { UserInputError } from 'apollo-server-express';
import { PrcGateway } from '../prc/prc.gateway';
import { ChannelUser } from '../prc/channel/channel-user/entities/channel-user.entity';
import { WsException } from '@nestjs/websockets';
import { AllowedUpdateBlockingMethod } from './dto/update-blocking.input';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import itemList from './entities/item.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => PrcGateway))
    private readonly prcGateway: PrcGateway,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  create(createUserInput: CreateUserInput) {
    return this.userRepository.insert(createUserInput);
  }

  findUserChannelList(identifier: number | string): Promise<User> {
    if (typeof identifier === 'undefined')
      throw new EntityNotFoundError(User, {});

    if (typeof identifier === 'number')
      return this.userRepository.findOneOrFail({
        where: { id: identifier },
        relations: ['channelList'],
      });
    return this.userRepository.findOneOrFail({
      where: { username: identifier },
      relations: ['channelList'],
    });
  }

  async findChannelUser(
    identifier: number | string,
    channelName: string,
  ): Promise<ChannelUser> {
    const user: User = await this.findUserChannelList(identifier);
    const channelUser: ChannelUser | undefined = user.channelList?.find(
      (channelUser) => channelUser.channel_name === channelName,
    );
    if (typeof channelUser === 'undefined')
      throw new WsException(identifier + ' not in ' + channelName);
    return channelUser;
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
    return this.userRepository.find();
  }

  async findOne(identifier: number | string): Promise<User> {
    if (typeof identifier === 'undefined')
      throw new EntityNotFoundError(User, {});

    if (typeof identifier === 'number')
      return this.userRepository.findOneByOrFail({ id: identifier });
    return this.userRepository.findOneByOrFail({ username: identifier });
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
        user.following_id?.includes(friendId) ||
        friend.following_id?.includes(id) ||
        user.blocking_id?.includes(friendId)
      )
        throw new UserInputError('Failed to send friend request');

      user.following?.push(friend);
      await this.userRepository.save(user);
    }

    if (method === AllowedUpdateFriendshipMethod.REMOVE) {
      if (
        !user.following_id?.includes(friendId) ||
        !friend.following_id?.includes(id)
      )
        throw new UserInputError('Failed to remove friend');

      user.following = user.following?.filter(
        (following) => following.id !== friendId,
      );
      friend.following = friend.following?.filter(
        (following) => following.id !== id,
      );
      await this.userRepository.save([friend, user]);
    }

    if (method === AllowedUpdateFriendshipMethod.ACCEPT) {
      if (
        user.following_id?.includes(friendId) ||
        !friend.following_id?.includes(id)
      ) {
        throw new UserInputError('Failed to accept friend request');
      }
      user.following?.push(friend);
      await this.userRepository.save(user);
    }

    if (method === AllowedUpdateFriendshipMethod.DECLINE) {
      if (
        user.following_id?.includes(friendId) ||
        !friend.following_id?.includes(id)
      )
        throw new UserInputError('Failed to decline friend request');

      friend.following = friend.following?.filter(
        (following) => following.id !== id,
      );
      await this.userRepository.save(friend);
    }

    if (method === AllowedUpdateFriendshipMethod.CANCEL) {
      if (
        !user.following_id?.includes(friendId) ||
        friend.following_id?.includes(id)
      ) {
        throw new UserInputError('Failed to cancel friend request');
      }
      user.following = user.following?.filter(
        (following) => following.id !== friendId,
      );
      await this.userRepository.save(user);
    }

    if (friend.socketId !== '') {
      this.prcGateway.server.to(friend.socketId).emit('onFriend', {
        method: method as string,
        id: id,
      });
    }
  }

  async updateBlocking(
    id: number,
    method: AllowedUpdateBlockingMethod,
    userId: number,
  ): Promise<void> {
    if (id === userId) throw new UserInputError('You cannot block yourself');

    const users: User[] = await this.userRepository.find({
      where: [{ id }, { id: userId }],
      relations: ['following', 'followers', 'blocking', 'blockedBy'],
    });
    const user: User | undefined = users.find((user) => user.id === id);
    const blockedUser: User | undefined = users.find(
      (user) => user.id === userId,
    );
    if (typeof user == 'undefined') {
      throw new EntityNotFoundError(User, id);
    }
    if (typeof blockedUser == 'undefined') {
      throw new EntityNotFoundError(User, userId);
    }

    if (method === AllowedUpdateBlockingMethod.BLOCK) {
      if (user.blocking_id?.includes(userId)) {
        throw new UserInputError('You already block this user');
      }

      user.blocking?.push(blockedUser);
      user.following = user.following?.filter(
        (following) => following.id !== userId,
      );
      blockedUser.following = blockedUser.following?.filter(
        (following) => following.id !== id,
      );
      await this.userRepository.save([user, blockedUser]);
    }

    if (method === AllowedUpdateBlockingMethod.UNBLOCK) {
      if (!user.blocking_id?.includes(userId))
        throw new UserInputError('You already unblock user');

      user.blocking = user.blocking?.filter(
        (blocking) => blocking.id !== userId,
      );
      await this.userRepository.save(user);
    }

    if (blockedUser.socketId !== '') {
      this.prcGateway.server.to(blockedUser.socketId).emit('onBlock', {
        method: method as string,
        id: id,
      });
    }
  }

  // https://developer.paypal.com/docs/api/orders/v2/#orders_get
  private async checkValidOrderId(
    id: number,
    orderId: string,
  ): Promise<number> {
    const { data } = await lastValueFrom(
      this.httpService
        .get('https://api-m.sandbox.paypal.com/v2/checkout/orders/' + orderId, {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Basic ' +
              Buffer.from(
                this.configService.get('PAYPAL_CLIENT_ID') +
                  ':' +
                  this.configService.get('PAYPAL_SECRET'),
              ).toString('base64'),
          },
        })
        .pipe(
          catchError((error) => {
            if (typeof error.response === 'undefined')
              throw new BadRequestException(error.response?.data);
            else throw new BadRequestException(error.message);
          }),
        ),
    );
    if (data.status !== 'COMPLETED')
      throw new UserInputError('Order is not completed');
    const itemId = +data.purchase_units[0].reference_id;
    if (
      +data.purchase_units[0].amount.value !== itemList[itemId].price ||
      data.purchase_units[0].amount.currency_code !== 'EUR'
    )
      throw new UserInputError('Item price is wrong');
    if (+data.purchase_units[0].custom_id !== id)
      throw new UserInputError('User id is wrong');
    return itemId;
  }

  async updateInventory(id: number, orderId: string): Promise<User> {
    const user: User = await this.findOne(id);
    const itemId = await this.checkValidOrderId(id, orderId);
    if (user.inventory.includes(itemId))
      throw new UserInputError('You already have this item');
    user.inventory.push(itemId);
    await this.userRepository.save(user);
    return user;
  }
}
