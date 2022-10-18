import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { Channel } from './entities/channel.entity';
import { ChannelUser } from './entities/channeluser.entity';
import { CreateChannelInput } from './dto/create-channel.input';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
    @InjectRepository(ChannelUser)
    private readonly channelUserRepository: Repository<ChannelUser>,
  ) {}

  findAll() {
    return this.channelRepository.find();
  }

  findOne(identifier: number | string): Promise<Channel> {
    if (typeof identifier === 'number')
      return this.channelRepository.findOneOrFail({ where: {id: identifier}, relations: ['userList', 'userList.user'] });
    else return this.channelRepository.findOneOrFail({ where: {name: identifier}, relations: ['userList', 'userList.user'] });
  }


async create(createChannelInput: CreateChannelInput) {
    const result: InsertResult = await this.channelRepository.insert(
      createChannelInput
    );
    return +result.identifiers[0].id;
  }
  /**
   *( Tries to find Channel based on name ? creates channel : Checks input password )
   */
  async join(createChannelInput: CreateChannelInput, user: User)
  { 
    let channel : Channel;
    let brandNew : boolean = false; 
    try
    {
    channel = await this.findOne(createChannelInput.name);
    }
    catch (Error)
    {
      console.log("New Channel created");
      channel = await this.findOne(await this.create(createChannelInput));
      brandNew = true;
    }
    if (createChannelInput.password === channel.password)
    {
      console.log("Good Password");
      if (!channel.userList.some((channelUser)=>channelUser.user.id === user.id))
      {
        await this.channelUserRepository.insert({
          user : user,
          channel : channel,
          owner : brandNew,
          admin : brandNew
        })
      }
      else
        throw new Error("Already in Channel");
        //Can probably be removed as we dont really care
    }
    else 
      throw new Error("Bad Password");
    return this.findOne(+channel.id);// for testing
  }

}
