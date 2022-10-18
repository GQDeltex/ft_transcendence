import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { Channel } from './entities/channel.entity';
import { ChannelUser } from './entities/channeluser.entity';
import { CreateChannelInput } from './dto/create-channel.input';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
    @InjectRepository(ChannelUser)
    private readonly channelUserRepository: Repository<ChannelUser>,
  ) {}

  async create(createChannelInput: CreateChannelInput) {
    const result: InsertResult = await this.channelRepository.insert(
      createChannelInput,
    );
    return +result.identifiers[0].id;
  }

  findAll() {
    return this.channelRepository.find();
  }

  findOne(identifier: number | string): Promise<Channel> {
    if (typeof identifier === 'number')
      return this.channelRepository.findOneByOrFail({ id: identifier });
    else return this.channelRepository.findOneByOrFail({ name: identifier });
  }
}
