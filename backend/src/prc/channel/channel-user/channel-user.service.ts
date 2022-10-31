import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository, UpdateResult } from 'typeorm';
import { ChannelUser } from './entities/channel-user.entity';

@Injectable()
export class ChannelUserService {
  constructor(
    @InjectRepository(ChannelUser)
    private readonly channelUserRepository: Repository<ChannelUser>,
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

  async updateBanRepo(channelUserID: number, bool: boolean): Promise<void> {
    const result: UpdateResult = await this.channelUserRepository.update(
      { id: channelUserID },
      { ban: bool },
    );
    if (typeof result.affected != 'undefined' && result.affected != 1)
      throw new EntityNotFoundError(ChannelUser, { id: channelUserID });
  }

  /*async updateBan(channelUser: ChannelUser): Promise<ChannelUser> {
    const result: UpdateResult = await this.channelUserRepository.update(
      { id: channelUser.id },
      { ban: true },
    );
    if (typeof result.affected != 'undefined' && result.affected != 1)
      throw new EntityNotFoundError(ChannelUser, { id: channelUser.id });
    const message: Message = {
        from: { id: -1, name: '' },
        to: { name: channelUser.channel_name },
        msg: channelUser.user.username + ' has been banned from your channel for 42 seconds.',
      };
    this.prcGatewayService.prcBan()
    client.broadcast.to(channelUser.channel_name).emit('status', message);
    client.leave(channelUser.channel_name);
    setTimeout(() => this.unban(channelUser, client), 42 * 1000);
    return await this.findOne(channelUser.id);
  }*/

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
