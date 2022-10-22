import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedSocket, WsException } from '@nestjs/websockets';
import { Repository } from 'typeorm';
import { ChannelUser } from './entities/channeluser.entity';
import { Socket } from 'socket.io';

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

  updatePassword(channelUser: ChannelUser, newPassword: string) {
    if (!channelUser.owner) throw new WsException('Not Channel Owner');
    channelUser.channel.password = newPassword;
    /*const message = {
      from: { id: -1, username: '' },
      to: { name: channelUser.channel.name },
      msg: 'The Owner has changed the Password',
    };*/
  }
}
