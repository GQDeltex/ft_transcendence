import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { Channel } from './entities/channel.entity';
import { ChannelUser } from './entities/channeluser.entity';
import { CreateChannelInput } from './dto/create-channel.input';
import { User } from 'src/users/entities/user.entity';
import { userInfo } from 'os';


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
      return this.channelRepository.findOneByOrFail({ id: identifier });
    else return this.channelRepository.findOneByOrFail({ name: identifier });
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
    let shiny : boolean = false; 
    try
    {
    channel = await this.findOne(createChannelInput.name);
    }
    catch (Error)
    {
      console.log("New Channel created");
      channel = await this.findOne( await this.create(createChannelInput));
      shiny = true;
    }
    if (createChannelInput.password === channel.password)
    {
      console.log("Good Password");
      if (!channel.userList.some((channelUser)=>channelUser.user.id === user.id))
      {
        await this.channelUserRepository.insert(
     {user : user,
      channel : channel,
      owner : shiny,
      admin : shiny
      }
        )
      }
      //(check if user is already on Channel ? throw "already on channel" : create new channel user and add to channel)
    }
    return this.findOne(channel.id);// for testing
  }

}
