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
import { CreateChannelInput, ToggleChannelPpInput } from './channel.input';
import { User } from '../../users/entities/user.entity';
import { WsException } from '@nestjs/websockets';
import { Message } from '../message/message';
import * as bcrypt from 'bcrypt';
import { UserInputError } from 'apollo-server-express';

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
      if (!channel.private) {
        if (channel.userList.some((channelUser) => channelUser.ban))
          return false;
        else return true;
      }
      return channel.userList.some(
        (channelUser) => channelUser.user_id === identifier && !channelUser.ban,
      );
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
    let passwdHash = createChannelInput.password;
    if (createChannelInput.password != '') {
      passwdHash = await bcrypt.hash(createChannelInput.password, 10);
    }
    const result: InsertResult = await this.channelRepository.insert(
      Object.assign(createChannelInput, { password: passwdHash }),
    );
    return +result.identifiers[0].id;
  }

  saveMessage(message: Message) {
    this.messages.push(message);
  }

  findMessagesForRecipient(recipient: string) {
    return this.messages.filter(
      ({ from, to }) => from.name === recipient || to.name === recipient,
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
    const userPassword = createChannelInput.password;
    try {
      channel = await this.findOne(createChannelInput.name);
    } catch (Error) {
      //console.log(createChannelInput.name + ' created'); DEBUG
      channel = await this.findOne(await this.create(createChannelInput));
      brandNew = true;
    }
    let passwordsAreEqual = true;
    if (channel.password != '') {
      passwordsAreEqual = await bcrypt.compare(userPassword, channel.password);
    }
    if (passwordsAreEqual) {
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

  async toggleChannel(toggleChannelPpInput: ToggleChannelPpInput, user: User) {
    const channel: Channel = await this.findOne(
      toggleChannelPpInput.channelName,
    );
    const channelOwner: ChannelUser | undefined = channel.userList.find(
      (channelUser) => {
        if (channelUser.user_id == user.id) return true;
        return false;
      },
    );
    if (typeof channelOwner == 'undefined')
      throw new UserInputError('You are not in this channel');
    if (channelOwner.owner == false)
      throw new UserInputError('You are not allowed to change this property');
    if (toggleChannelPpInput.private != channel.private) {
      channel.private = toggleChannelPpInput.private;
      await this.channelRepository.save(channel);
    }
    return channel;
  }

  async leave(channelName: string, user: User): Promise<Channel | null> {
    const channel: Channel = await this.findOne(channelName);
    const channelUser: ChannelUser | undefined = channel.userList.find(
      (channelUser) => channelUser.user_id === user.id,
    );
    if (typeof channelUser === 'undefined')
      throw new WsException("Can't leave a channel you're not in");
    if (channelUser.ban || channelUser.mute)
      throw new WsException("Can't leave because you're muted or banned");

    if (channelUser.owner && channel.userList.length > 1) {
      let newOwner: ChannelUser | undefined;
      const userList: ChannelUser[] = channel.userList.filter(
        (channelUser) => channelUser.user_id !== user.id,
      );
      // First admin that isn't muted or banned
      newOwner = userList.find(
        (channelUser) =>
          channelUser.admin && !channelUser.mute && !channelUser.ban,
      );
      // First admin that is muted but not banned
      if (typeof newOwner === 'undefined') {
        newOwner = userList.find(
          (channelUser) =>
            channelUser.admin && channelUser.mute && !channelUser.ban,
        );
      }
      // First admin that is muted and banned
      if (typeof newOwner === 'undefined') {
        newOwner = userList.find((channelUser) => channelUser.admin);
      }
      // First user that isn't muted or banned
      if (typeof newOwner === 'undefined') {
        newOwner = userList.find(
          (channelUser) => !channelUser.mute && !channelUser.ban,
        );
      }
      // First user that is muted but not banned
      if (typeof newOwner === 'undefined') {
        newOwner = userList.find(
          (channelUser) => channelUser.mute && !channelUser.ban,
        );
      }
      // First user that is muted and banned
      if (typeof newOwner === 'undefined') {
        newOwner = userList[0];
      }
      // Update new owner
      await this.channelUserRepository.update(
        { id: newOwner.id },
        { owner: true },
      );
    }
    await this.channelUserRepository.delete({ id: channelUser.id });
    if (channel.userList.length === 1) {
      await this.channelRepository.delete({ id: channel.id });
      return null;
    }
    return this.findOne(channel.id);
  }

  /**
  1. First, we’re using the `update` method to update the password of the channel.
  2. Then, we’re using the `findOne` method to get the updated channel.
  3. Finally, we’re returning the updated channel.
  */
  async updatePassword(channelName: string, newPassword: string) {
    let passwdHash = newPassword;
    if (newPassword != '') {
      passwdHash = await bcrypt.hash(newPassword, 10);
    }
    const result: UpdateResult = await this.channelRepository.update(
      { name: channelName },
      { password: passwdHash },
    );
    if (typeof result.affected != 'undefined' && result.affected != 1)
      throw new EntityNotFoundError(Channel, { name: channelName });
    return await this.findOne(channelName);
  }
}
