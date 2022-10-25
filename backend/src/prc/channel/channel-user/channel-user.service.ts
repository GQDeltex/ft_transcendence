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

  findAll() {
    return this.channelUserRepository.find();
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

  async updateAdmin(channelUser: ChannelUser): Promise<ChannelUser> {
    const result: UpdateResult = await this.channelUserRepository.update(
      { id: channelUser.id },
      { admin: true },
    ); //Is it possible to search by the channelUser? if not, only send channelUser.id to this function to save mem
    if (typeof result.affected != 'undefined' && result.affected != 1)
      throw new EntityNotFoundError(ChannelUser, { id: channelUser.id });
    return await this.findOne(channelUser.id);
  }

  async updateBan(channelUser: ChannelUser): Promise<ChannelUser> {
    const newTime = new Date();
    newTime.setMilliseconds(newTime.getMilliseconds() + 30000);
    const result: UpdateResult = await this.channelUserRepository.update(
      { id: channelUser.id },
      { ban: true, unbanTime: newTime },
    ); //Is it possible to search by the channelUser? if not, only send channelUser.id to this function to save mem
    if (typeof result.affected != 'undefined' && result.affected != 1)
      throw new EntityNotFoundError(ChannelUser, { id: channelUser.id });
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
    setTimeout(() => this.unmute(channelUser.id), 30 * 1000);
    return await this.findOne(channelUser.id);
  }
}
