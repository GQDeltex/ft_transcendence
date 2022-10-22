import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WsException,
  BaseWsExceptionFilter,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import {
  UseGuards,
  createParamDecorator,
  ExecutionContext,
  UseFilters,
  Catch,
  ArgumentsHost,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { WsJwt2FAAuthGuard } from '../auth/guard/wsJwt.guard';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { EntityNotFoundError } from 'typeorm';
import { TokenExpiredError } from 'jsonwebtoken';
import { CreateChannelInput } from './channel/dto/create-channel.input';
import { ChannelService } from './channel/channel.service';
import { JwtPayload } from 'src/auth/strategy/jwt.strategy';
import { ChannelUser } from './channel/entities/channeluser.entity';
import { Channel } from './channel/entities/channel.entity';

export const CurrentUserFromWs = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const client = ctx.switchToWs().getClient<Socket>();
    const user = client.data.user;

    if (!user) {
      return null;
    }

    return data ? user[data] : user; // extract a specific property only if specified or get a user object
  },
);

@Catch(WsException, EntityNotFoundError, TokenExpiredError, BadRequestException)
export class CustomPrcExceptionFilter extends BaseWsExceptionFilter {
  catch(
    exception:
      | WsException
      | EntityNotFoundError
      | TokenExpiredError
      | BadRequestException,
    host: ArgumentsHost,
  ) {
    // For some reason this throws an 'Error' again?
    //super.catch(exception, host);
    const client = host.switchToWs().getClient<Socket>();
    client.emit('exception', { status: 'error', message: exception.message });
  }
}

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

  @SubscribeMessage('newconnection')
  async connect(
    @CurrentUserFromWs() JWTtoken: JwtPayload,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    console.log('Client connected', client.id, JWTtoken.username);
    await this.usersService.updateSocketId(JWTtoken.id, client.id);
    await this.usersService.updateStatus(JWTtoken.id, 'online');
    const user: User = await this.usersService.findOne(JWTtoken.id);
    const channelUsers: ChannelUser[] | undefined = user.channelList;
    if (typeof channelUsers === 'undefined') return;
    channelUsers.forEach((channelUser) => {
      client.join(channelUser.channel_name),
        this.channelService
          .findMessagesForRecipient(channelUser.channel_name)
          .forEach((message) => client.emit('prc', message));
    });
    this.channelService
      .findMessagesForRecipient(user.username)
      .forEach((message) => client.emit('prc', message));
  }

  /**
    It sends mmessage to a channel or user.
  
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

    console.log(`Message from ${user.username}(${client.id}) to ${to}: ${msg}`);
    let recipient: User | Channel;
    if (to[0] == '#' || to[0] == '&')
      recipient = await this.channelService.findOne(to);
    else recipient = await this.usersService.findOne(to);
    const sender: User = await this.usersService.findOne(user.id);
    let recClient;
    const message = {
      from: { id: sender.id, username: sender.username },
      to: { name: to },
      msg: msg,
    };
    if (recipient instanceof User) {
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
      if (!this.usersService.isInChannel(sender, to))
        throw new WsException(
          'Recipient not found ###DEBUG Sender not on channel',
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
  ): Promise<void> {
    if (typeof user == 'undefined') throw new WsException('Not connected');
    console.log(`Join attempt from ${user.username} for ${channelInput.name}`); //DEBUG
    const sender: User = await this.usersService.findOne(user.id);
    const channel = await this.channelService.join(channelInput, sender);
    client.join(channel.name);
    const message = {
      from: { id: -1, username: '' },
      to: { name: channel.name },
      msg: sender.username + ' has joined your channel.',
    };
    //this.channelService.saveMessage(message);
    client.broadcast.to(channel.name).emit('status', message);
    this.channelService
      .findMessagesForRecipient(channel.name)
      .forEach((message) => client.emit('prc', message));
    console.log(`Join success from ${user.username} for ${channelInput.name}`); // DEBUG
  }
}
