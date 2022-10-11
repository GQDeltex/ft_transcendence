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
export class PrcGateway {
  constructor(private readonly usersService: UsersService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('connect')
  connect(@MessageBody() data: any): void {
    console.log('Connect', data);
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('prc')
  async prcMessage(
    @CurrentUserFromWs() user: any,
    @MessageBody('to') to: string,
    @MessageBody('msg') msg: string,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    console.log(`Message from ${user.username}(${client.id}) to ${to}: ${msg}`);
    const recipient: User | null = await this.usersService.findOne(to);
    if (typeof recipient === 'undefined') throw new Error();
  }
}
