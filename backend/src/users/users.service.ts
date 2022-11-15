import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import {
  EntityNotFoundError,
  Like,
  QueryFailedError,
  Repository,
  UpdateResult,
} from 'typeorm';
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
import {
  AllowedUpdateEquippedItemsMethod,
  UpdateUserEquippedItemsInput,
} from './dto/update-equipped-items.input';
import {
  AllowedUpdateGameRequestMethod,
  UpdateGameRequestInput,
} from './dto/update-gamerequest.input';
import { Game, GameState } from '../game/entities/game.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => PrcGateway))
    private readonly prcGateway: PrcGateway,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<void> {
    createUserInput.default_picture = createUserInput.picture;
    try {
      await this.userRepository.insert(createUserInput);
    } catch (error) {
      if (!(error instanceof QueryFailedError)) return Promise.reject(error);
      const existingUsers: User[] = await this.userRepository.find({
        // This Like might be susceptible to SQL Injection attacks.
        // https://github.com/typeorm/typeorm/issues/778  4 says it should be fine.
        // And the data is coming from Intra... So... It should be fine... I guess?
        where: { username: Like(`${createUserInput.username}%`) },
      });
      if (existingUsers.length == 0) return Promise.reject(error);
      let highestNumber = 0;
      for (const existingUser of existingUsers) {
        if (existingUser.id == createUserInput.id) return Promise.reject(error);
        const rx = /^(\D*)([0-9]*)$/;
        const rxParts = rx.exec(existingUser.username);
        if (rxParts == null) continue;
        if (rxParts[2] == '') continue;
        if (Number(rxParts[2]) > highestNumber) {
          createUserInput.username = rxParts[1] + (Number(rxParts[2]) + 1);
          highestNumber = Number(rxParts[2]);
        }
      }
      if (highestNumber == 0) createUserInput.username += '1';
      await this.userRepository.insert(createUserInput);
    }
    return Promise.resolve();
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

  async findLeaders(): Promise<User[]> {
    return await this.userRepository.find({
      order: { points: 'DESC' },
      take: 6,
    });
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

  async updateTitle(id: number, title: string): Promise<void> {
    const user = await this.findOne(id);
    user.title[0] = title;
    await this.userRepository.save(user);
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
        lastLoggedIn: status === 'online' ? new Date(Date.now()) : undefined,
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
        method,
        id,
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
      relations: [
        'following',
        'followers',
        'blocking',
        'blockedBy',
        'sentGameRequests',
        'receivedGameRequests',
      ],
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
      user.sentGameRequests = user.sentGameRequests?.filter(
        (user) => user.id !== userId,
      );
      blockedUser.sentGameRequests = blockedUser.sentGameRequests?.filter(
        (user) => user.id !== id,
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
        method,
        id,
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

  async updateEquippedItems(id: number, input: UpdateUserEquippedItemsInput) {
    const user: User = await this.findOne(id);
    if (input.method == AllowedUpdateEquippedItemsMethod.EQUIP) {
      if (!user.inventory.includes(input.itemId))
        throw new UserInputError('You do not have this item');
      if (user.equipped.includes(input.itemId))
        throw new UserInputError('You already have this item equipped');
      user.equipped = user.equipped.filter(
        (itemId) => itemList[itemId].type !== itemList[input.itemId].type,
      );
      user.equipped.push(input.itemId);
    }
    if (input.method == AllowedUpdateEquippedItemsMethod.UNEQUIP) {
      if (!user.equipped.includes(input.itemId))
        throw new UserInputError('You do not have this item equipped');
      user.equipped = user.equipped.filter((itemId) => itemId !== input.itemId);
    }
    await this.userRepository.save(user);
    return user;
  }

  async updateGameRequest(
    id: number,
    input: UpdateGameRequestInput,
  ): Promise<void> {
    if (id === input.userId)
      throw new UserInputError('You cannot send game request to yourself');

    const users: User[] = await this.userRepository.find({
      where: [{ id }, { id: input.userId }],
      relations: ['sentGameRequests', 'receivedGameRequests'],
    });
    const user: User | undefined = users.find((user) => user.id === id);
    const invitedUser: User | undefined = users.find(
      (user) => user.id === input.userId,
    );
    if (typeof user === 'undefined') throw new EntityNotFoundError(User, id);
    if (typeof invitedUser === 'undefined')
      throw new EntityNotFoundError(User, input.userId);

    if (input.method === AllowedUpdateGameRequestMethod.SEND) {
      if (
        user.sentGameRequests_id?.includes(input.userId) ||
        user.receivedGameRequests_id?.includes(input.userId) ||
        user.blocking_id?.includes(input.userId)
      )
        throw new UserInputError('Failed to send a game request to this user.');
      user.sentGameRequests?.push(invitedUser);
      await this.userRepository.save(user);
    }

    if (input.method === AllowedUpdateGameRequestMethod.ACCEPT) {
      if (!user.receivedGameRequests_id?.includes(input.userId))
        throw new UserInputError(
          'You do not received game request from this user',
        );
      if (invitedUser.socketId === '')
        throw new UserInputError('User is not online');
      if (invitedUser.status === 'in game')
        throw new UserInputError('Player is in game');
      invitedUser.sentGameRequests = invitedUser.sentGameRequests?.filter(
        (user) => user.id !== id,
      );
      user.receivedGameRequests = user.receivedGameRequests?.filter(
        (user) => user.id !== input.userId,
      );
      invitedUser.status = 'in game';
      user.status = 'in game';
      await this.userRepository.save([invitedUser, user]);
      const game: Game = await this.gameRepository.save({
        state: GameState.RUNNING,
        player1Id: invitedUser.id,
        player1: invitedUser,
        player2Id: user.id,
        player2: user,
      });
      this.prcGateway.server
        .to(invitedUser.socketId)
        .emit('onGameRequestAccepted', {
          gameId: game.id,
        });
      return;
    }

    if (input.method === AllowedUpdateGameRequestMethod.DECLINE) {
      if (!user.receivedGameRequests_id?.includes(input.userId))
        throw new UserInputError(
          'You do not received game request from this user',
        );
      invitedUser.sentGameRequests = invitedUser.sentGameRequests?.filter(
        (user) => user.id !== id,
      );
      await this.userRepository.save(invitedUser);
    }

    if (input.method === AllowedUpdateGameRequestMethod.CANCEL) {
      if (!user.sentGameRequests_id?.includes(input.userId))
        throw new UserInputError('You do not sent game request to this user');
      user.sentGameRequests = user.sentGameRequests?.filter(
        (user) => user.id !== input.userId,
      );
      await this.userRepository.save(user);
    }

    if (invitedUser.socketId !== '') {
      this.prcGateway.server.to(invitedUser.socketId).emit('onGameRequest', {
        method: input.method,
        id,
      });
    }
  }

  async findRank(user: User) {
    const users: User[] = await this.userRepository.find({
      order: { points: 'DESC' },
    });
    const rank: number = users.findIndex((u) => u.id === user.id);
    if (rank === -1) return rank;
    return rank + 1;
  }
}
