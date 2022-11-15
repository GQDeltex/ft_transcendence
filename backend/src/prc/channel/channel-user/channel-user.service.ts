import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrcGateway } from '../../prc.gateway';
import { EntityNotFoundError, Repository, UpdateResult } from 'typeorm';
import { ChannelUser } from './entities/channel-user.entity';
import { WsException } from '@nestjs/websockets';
import { Message } from '../../message/message';
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

  findChannelUserInChannel(userId: number, channelName: string) {
    return this.channelUserRepository.findOneOrFail({
      where: { channel_name: channelName, user_id: userId },
    });
  }

  async updateAdmin(
    userId: number,
    otherId: number,
    channelName: string,
  ): Promise<ChannelUser> {
    if (otherId === 0)
      throw new WsException('You God(ie Vincent) is already an admin');
    const channelUser: ChannelUser = await this.findChannelUserInChannel(
      userId,
      channelName,
    );
    if (!channelUser.admin)
      throw new WsException(userId + ' is not an admin on ' + channelName);
    if (channelUser.ban)
      throw new WsException(
        'You are temporarily banned. Please wait till you are no longer banned',
      );
    const otherChannelUser: ChannelUser = await this.findChannelUserInChannel(
      otherId,
      channelName,
    );
    otherChannelUser.admin = !otherChannelUser.admin;
    await this.channelUserRepository.save(otherChannelUser);
    return otherChannelUser;
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
    // console.log('No longer Banned');
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
      isNew: true,
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
