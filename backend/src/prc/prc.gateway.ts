import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import {
  UseGuards,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { WsJwtAuthGuard } from '../auth/guard/jwt.guard';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

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

@WebSocketGateway({
  cors: {
    origin: 'http://localhost',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
@UseGuards(WsJwtAuthGuard)
export class PrcGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly usersService: UsersService) {}

  @SubscribeMessage('newconnection')
  async connect(
    @CurrentUserFromWs() user: any,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    console.log('Client connected', client.id, user.username);
    await this.usersService.updateSocketId(user.id, client.id);
  }

  @SubscribeMessage('prc')
  async prcMessage(
    @CurrentUserFromWs() user: any,
    @MessageBody('to') to: string,
    @MessageBody('msg') msg: string,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    if (typeof user == 'undefined') throw new Error('Not connected');
    console.log(`Message from ${user.username}(${client.id}) to ${to}: ${msg}`);
    const recipient: User | null = await this.usersService.findOne(to);
    if (recipient == null) throw new Error('Recipient not in database');
    if (recipient.socketId == '') throw new Error('Recipient socketId empty');
    const sockets = await this.server.in(recipient.socketId).fetchSockets();
    if (sockets.length < 1) throw new Error('Could not find Recipients socket');
    const recClient = sockets[0];
    recClient.emit('prc', { from: user, to: recipient, msg: msg });
    console.log('Sent message!');
  }
}
