import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WsException,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import {
  UseGuards,
  UseFilters,
  UsePipes,
  ValidationPipe,
  Injectable,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { WsJwt2FAAuthGuard } from '../auth/guard/wsJwt.guard';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { CreateChannelInput, LeaveChannelInput } from './channel/channel.input';
import { ChannelService } from './channel/channel.service';
import { JwtPayload } from 'src/auth/strategy/jwt.strategy';
import { ChannelUser } from './channel/channel-user/entities/channel-user.entity';
import { Channel } from './channel/entities/channel.entity';
import { CustomPrcExceptionFilter } from '../tools/ExceptionFilter';
import { CurrentUserFromWs } from '../tools/UserFromWs';
import { Message } from './message/message';

@Injectable()
@UsePipes(new ValidationPipe())
@WebSocketGateway({
  cors: {
    origin: `http://${process.env.DOMAIN}`,
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
@UseGuards(WsJwt2FAAuthGuard)
@UseFilters(CustomPrcExceptionFilter)
export class PrcGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly channelService: ChannelService,
  ) {}

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('Client disconnected', client.id);
    try {
      await this.usersService.updateStatus(client.id, 'offline');
      await this.usersService.updateSocketId(client.id, '');
    } catch (EntityNotFoundError) {
      // Do nothing.
      // We need to do this to catch errors that arise if the socket
      // information is not in the database yet. So this shouldn't be a problem.
    }
  }

  @SubscribeMessage('newConnection')
  async connect(
    @CurrentUserFromWs() jwtToken: JwtPayload,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    console.log('Client connected', client.id, jwtToken.id);
    const user: User = await this.usersService.findOne(jwtToken.id);
    if (user.socketId != '') {
      const sockets = await this.server.in(user.socketId).fetchSockets();
      if (sockets.length >= 1) sockets[0].emit('newClient');
    }
    await this.usersService.updateSocketId(jwtToken.id, client.id);
    await this.usersService.updateStatus(jwtToken.id, 'online');
    const channelUsers: ChannelUser[] | undefined = user.channelList;
    if (typeof channelUsers === 'undefined') return;
    channelUsers.forEach((channelUser) => {
      client.join(channelUser.channel_name);
      this.channelService
        .findMessagesForRecipient(channelUser.channel_name)
        .filter(({ to }) => to.name.startsWith('#'))
        .forEach((message) => client.emit('prc', { ...message, isNew: false }));
    });
    this.channelService
      .findMessagesForRecipient(user.username)
      .filter(({ to }) => !to.name.startsWith('#'))
      .forEach((message) => client.emit('prc', { ...message, isNew: false }));
  }

  /**
    It sends message to a channel or user.

  Args:
    user: The user who sent the message.
    to: The recipient of the message.
    msg: The message that was sent.
    client: The socket that sent the message.
  Returns:
    Nothing.
  */
  @SubscribeMessage('prc')
  async prcMessage(
    @CurrentUserFromWs() user: JwtPayload,
    @MessageBody('to') to: string,
    @MessageBody('msg') msg: string,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    if (typeof user == 'undefined') throw new WsException('Not connected');

    console.log(`Message from ${user.id}(${client.id}) to ${to}: ${msg}`);
    let recipient: User | Channel;
    if (to[0] == '#' || to[0] == '&')
      recipient = await this.channelService.findOne(to);
    else recipient = await this.usersService.findOne(to);
    const sender: User = await this.usersService.findOne(user.id);
    let recClient;
    const message: Message = {
      from: { id: sender.id, name: sender.username },
      to: { name: to },
      msg: msg,
      isNew: true,
    };
    if (recipient instanceof User) {
      if (sender.blocking_id?.includes(recipient.id)) {
        throw new WsException('Unable to send message to blocked user.');
      }
      if (sender.blockedBy_id?.includes(recipient.id)) {
        throw new WsException('Unable to send message.');
      }
      if (recipient.socketId == '') {
        //throw new WsException('Recipient socketId empty');
        this.channelService.saveMessage(message);
        return;
      }
      const sockets = await this.server.in(recipient.socketId).fetchSockets();
      if (sockets.length < 1)
        throw new WsException('Could not find Recipients socket');
      recClient = sockets[0];
    } else {
      if (!sender.isInChannel(to))
        throw new WsException(
          'Recipient not found ###DEBUG Sender not on channel',
        );
      const sendChannelUser: ChannelUser =
        await this.usersService.findChannelUser(sender.id, recipient.name);
      if (sendChannelUser.mute || sendChannelUser.ban)
        throw new WsException(
          'Sender does not have permission to send messages',
        );
      recClient = client.to(recipient.name);
    }
    recClient.emit('prc', message);
    this.channelService.saveMessage(message);
    console.log('Sent message!');
  }

  /**
  It creates a new channel and adds the user to it.
  */
  @SubscribeMessage('join')
  async joinChannel(
    @CurrentUserFromWs() user: JwtPayload,
    @ConnectedSocket() client: Socket,
    @MessageBody('channel') channelInput: CreateChannelInput,
  ) {
    if (typeof user == 'undefined') throw new WsException('Not connected');
    console.log(`Join attempt from ${user.id} for ${channelInput.name}`); //DEBUG
    const sender: User = await this.usersService.findOne(user.id);
    const channel = await this.channelService.join(channelInput, sender);
    client.join(channel.name);
    const message: Message = {
      from: { id: -1, name: '' },
      to: { name: channel.name },
      msg: sender.username + ' has joined your channel.',
      isNew: true,
    };
    //this.channelService.saveMessage(message);
    client.broadcast.to(channel.name).emit('status', message);
    this.channelService
      .findMessagesForRecipient(channel.name)
      .forEach((message) => client.emit('prc', message));
    console.log(`Join success from ${user.id} for ${channelInput.name}`); // DEBUG
    return {
      id: channel.id,
      name: channel.name,
      private: channel.private,
      userList: channel.userList,
    };
  }

  @SubscribeMessage('leave')
  async leaveChannel(
    @CurrentUserFromWs() jwtPayload: JwtPayload,
    @ConnectedSocket() client: Socket,
    @MessageBody('channel') leaveChannelInput: LeaveChannelInput,
  ): Promise<boolean> {
    const user: User = await this.usersService.findOne(jwtPayload.id);
    const channel: Channel | null = await this.channelService.leave(
      leaveChannelInput.name,
      user,
    );
    client.leave(leaveChannelInput.name);
    if (channel === null) return false;
    const leaveMessage: Message = {
      from: { id: -1, name: '' },
      to: { name: leaveChannelInput.name },
      msg: user.username + ' has left your channel.',
      isNew: true,
    };
    client.broadcast.to(leaveChannelInput.name).emit('status', leaveMessage);
    return true;
  }
}
