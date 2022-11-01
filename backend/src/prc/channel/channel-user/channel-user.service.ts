import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrcGateway } from '../../../prc/prc.gateway';
import { EntityNotFoundError, Repository, UpdateResult } from 'typeorm';
import { ChannelUser } from './entities/channel-user.entity';
import { WsException } from '@nestjs/websockets';
import { Message } from '../../../prc/message/message';
import { User } from '../../../users/entities/user.entity';

@Injectable()
export class ChannelUserService {
  constructor(
    @InjectRepository(ChannelUser)
    private readonly channelUserRepository: Repository<ChannelUser>,
    private readonly prcGateway: PrcGateway,
  ) {}

  async findAll(userId: number) {
    const channelUsers: ChannelUser[] = await this.channelUserRepository.find({
      relations: ['channel'],
    });
    return channelUsers.filter((channelUser) => {
      if (!channelUser.channel.private) return true;
      return channelUser.channel.userList.some(
        (channelUser) => channelUser.user_id === userId,
      );
    });
  }

  findOne(identifier: number | string): Promise<ChannelUser> {
    if (typeof identifier === 'number')
      return this.channelUserRepository.findOneOrFail({
        where: { id: identifier },
        relations: ['channel' /*, 'channel.channel'*/],
      });
    else
      return this.channelUserRepository.findOneOrFail({
        where: { channel_name: identifier },
        relations: ['channel' /*, 'channel.channel'*/],
      });
  }

  findAllInChannel(channelName: string) {
    return this.channelUserRepository.find({
      where: { channel_name: channelName },
      relations: ['user'],
    });
  }

  async updateAdmin(channelUser: ChannelUser): Promise<ChannelUser> {
    const result: UpdateResult = await this.channelUserRepository.update(
      { id: channelUser.id },
      { admin: true },
    ); //Is it possible to search by the channelUser? if not, only send channelUser.id to this function to save mem
    if (typeof result.affected != 'undefined' && result.affected != 1)
      throw new EntityNotFoundError(ChannelUser, { id: channelUser.id });
    return await this.findOne(channelUser.id);
  }

  async unban(
    user: User,
    channelUser: ChannelUser,
    channelName: string,
  ): Promise<void> {
    const result: UpdateResult = await this.channelUserRepository.update(
      { id: channelUser.id },
      { ban: false },
    );
    if (typeof result.affected != 'undefined' && result.affected != 1)
      throw new EntityNotFoundError(ChannelUser, { id: channelUser.id });
    if (user.socketId != '') {
      const sockets = await this.prcGateway.server
        .in(user.socketId)
        .fetchSockets();
      if (sockets.length >= 1) sockets[0].join(channelName);
    }
    console.log('No longer Banned');
  }

  async updateBan(
    user: User,
    channelUser: ChannelUser,
    channelName: string,
  ): Promise<ChannelUser> {
    if (user.socketId === '') throw new WsException('Empty Socket');
    const sockets = await this.prcGateway.server
      .in(user.socketId)
      .fetchSockets();
    if (sockets.length < 1) throw new WsException('Empty Socket');
    const message: Message = {
      from: { id: channelUser.user_id, name: '' },
      to: { name: channelName },
      msg:
        channelUser.user_id +
        ' has been banned from your channel for 42 seconds.',
    };
    sockets[0].emit('status', message);
    const result: UpdateResult = await this.channelUserRepository.update(
      { id: channelUser.id },
      { ban: true },
    );
    if (typeof result.affected != 'undefined' && result.affected != 1)
      throw new EntityNotFoundError(ChannelUser, { id: channelUser.id });
    sockets[0].leave(channelName);
    setTimeout(() => this.unban(user, channelUser, channelName), 42 * 1000);
    return await this.findOne(channelUser.id);
  }

  async unmute(channelUserID: number): Promise<void> {
    const result: UpdateResult = await this.channelUserRepository.update(
      { id: channelUserID },
      { mute: false },
    );
    if (typeof result.affected != 'undefined' && result.affected != 1)
      throw new EntityNotFoundError(ChannelUser, { id: channelUserID });
  }

  async updateMute(channelUser: ChannelUser): Promise<ChannelUser> {
    const result: UpdateResult = await this.channelUserRepository.update(
      { id: channelUser.id },
      { mute: true },
    );
    if (typeof result.affected != 'undefined' && result.affected != 1)
      throw new EntityNotFoundError(ChannelUser, { id: channelUser.id });
    setTimeout(() => this.unmute(channelUser.id), 42 * 1000);
    return await this.findOne(channelUser.id);
  }
}
