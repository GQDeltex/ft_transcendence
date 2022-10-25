import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EntityNotFoundError,
  InsertResult,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Channel } from './entities/channel.entity';
import { ChannelUser } from './channel-user/entities/channel-user.entity';
import { CreateChannelInput } from './dto/create-channel.input';
import { User } from '../../users/entities/user.entity';
import { WsException } from '@nestjs/websockets';
import { Message } from '../message/message';

@Injectable()
export class ChannelService {
  messages: Message[] = [];

  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
    @InjectRepository(ChannelUser)
    private readonly channelUserRepository: Repository<ChannelUser>,
  ) {}

  findAll() {
    return this.channelRepository.find();
  }

  async findJoined(identifier: number): Promise<Channel[]> {
    const channels: Channel[] = await this.channelRepository.find();
    return channels.filter((channel) => {
      if (channel.private === false) return true;
      if (
        channel.userList.some(
          (channelUser) => channelUser.user_id === identifier,
        )
      )
        return true;
      return false;
    });
  }

  /*
  1. First, we’re checking if the identifier is a number or a string.
  2. If it’s a number, we’re using the `findOneOrFail` method to find the channel by its ID.
  3. If it’s a string, we’re using the `findOneOrFail` method to find the channel by its name.
  4. We’re also specifying that we want to include the `userList` and `userList.user` relations in the response.
  */
  findOne(identifier: number | string): Promise<Channel> {
    if (typeof identifier === 'number')
      return this.channelRepository.findOneOrFail({
        where: { id: identifier },
        relations: ['userList', 'userList.user'],
      });
    else
      return this.channelRepository.findOneOrFail({
        where: { name: identifier },
        relations: ['userList', 'userList.user'],
      });
  }

  /**
  Create a new channel.
  
  Args:
    createChannelInput: The input for the createChannel method.
  Returns:
    The id of the newly created channel.
  */
  async create(createChannelInput: CreateChannelInput): Promise<number> {
    const result: InsertResult = await this.channelRepository.insert(
      createChannelInput,
    );
    return +result.identifiers[0].id;
  }

  saveMessage(message: Message) {
    this.messages.push(message);
  }

  findMessagesForRecipient(recipient: string) {
    return this.messages.filter(
      ({ from, to }) => from.username === recipient || to.name === recipient,
    );
  }

  /**
  1. First, we try to find the channel by its name. If it doesn't exist, we create it.
  2. Then, we check if the password is correct. If it is, we add the user to the channel.
  3. If the password is incorrect, we throw an error.
  4. If the user is already in the channel, we throw an error.
  5. Finally, we return the channel.
  */
  async join(createChannelInput: CreateChannelInput, user: User) {
    let channel: Channel;
    let brandNew = false;
    try {
      channel = await this.findOne(createChannelInput.name);
    } catch (Error) {
      //console.log(createChannelInput.name + ' created'); DEBUG
      channel = await this.findOne(await this.create(createChannelInput));
      brandNew = true;
    }
    if (createChannelInput.password === channel.password) {
      //console.log('Good Password'); DEBUG
      if (
        !channel.userList.some((channelUser) => channelUser.user.id === user.id)
      ) {
        await this.channelUserRepository.insert({
          user: user,
          channel: channel,
          owner: brandNew,
          admin: brandNew,
        });
      } else throw new WsException('Already in Channel');
      //still needs to rejoin room(if they are not being stupid and just clicking join again while being in the room)
    } else throw new WsException('Bad Password');
    return this.findOne(+channel.id); //'+' VIC ;)
  }

  /**
  1. First, we’re using the `update` method to update the password of the channel.
  2. Then, we’re using the `findOne` method to get the updated channel.
  3. Finally, we’re returning the updated channel.
  */
  async updatePassword(channelName: string, newPassword: string) {
    const result: UpdateResult = await this.channelRepository.update(
      { name: channelName },
      { password: newPassword },
    );
    if (typeof result.affected != 'undefined' && result.affected != 1)
      throw new EntityNotFoundError(Channel, { name: channelName });
    return await this.findOne(channelName);
  }
}
