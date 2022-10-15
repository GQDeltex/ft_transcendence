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
} from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { WsJwtAuthGuard } from '../auth/guard/jwt.guard';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { EntityNotFoundError } from 'typeorm';
import { TokenExpiredError } from 'jsonwebtoken';

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

@Catch(WsException, EntityNotFoundError, TokenExpiredError)
export class CustomPrcExceptionFilter extends BaseWsExceptionFilter {
  catch(
    exception: WsException | EntityNotFoundError | TokenExpiredError,
    host: ArgumentsHost,
  ) {
    // For some reason this throws an 'Error' again?
    //super.catch(exception, host);
    const client = host.switchToWs().getClient<Socket>();
    client.emit('exception', { status: 'error', message: exception.message });
  }
}

@WebSocketGateway({
  cors: {
    origin: `http://${process.env.DOMAIN}`,
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
@UseGuards(WsJwtAuthGuard)
@UseFilters(CustomPrcExceptionFilter)
export class PrcGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly usersService: UsersService) {}

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('Client disconnected', client.id);
    await this.usersService.updateStatus(client.id, 'offline');
    await this.usersService.updateSocketId(client.id, '');
  }

  @SubscribeMessage('newconnection')
  async connect(
    @CurrentUserFromWs() user: any,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    console.log('Client connected', client.id, user.username);
    await this.usersService.updateSocketId(user.id, client.id);
    await this.usersService.updateStatus(user.id, 'online');
  }

  @SubscribeMessage('prc')
  async prcMessage(
    @CurrentUserFromWs() user: any,
    @MessageBody('to') to: string,
    @MessageBody('msg') msg: string,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    if (typeof user == 'undefined') throw new WsException('Not connected');
    console.log(`Message from ${user.username}(${client.id}) to ${to}: ${msg}`);
    const recipient: User | null = await this.usersService.findOne(to);
    if (recipient == null) throw new WsException('Recipient not in database');
    if (recipient.socketId == '')
      throw new WsException('Recipient socketId empty');
    const sockets = await this.server.in(recipient.socketId).fetchSockets();
    if (sockets.length < 1)
      throw new WsException('Could not find Recipients socket');
    const recClient = sockets[0];
    recClient.emit('prc', { from: user, to: recipient, msg: msg });
    console.log('Sent message!');
  }
}
