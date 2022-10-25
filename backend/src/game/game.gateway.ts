import {
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsJwt2FAAuthGuard } from '../auth/guard/wsJwt.guard';
import { JwtPayload } from '../auth/strategy/jwt.strategy';
import { CustomPrcExceptionFilter } from '../tools/ExceptionFilter';
import { CurrentUserFromWs } from '../tools/UserFromWs';

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
export class GameGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @CurrentUserFromWs() jwtToken: JwtPayload,
    @MessageBody() to: unknown,
  ) {
    console.log(to);
    client.emit('message', to);
  }
}
