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
import { WsJwt2FAAuthGuard } from 'src/auth/guard/wsJwt.guard';
import { JwtPayload } from 'src/auth/strategy/jwt.strategy';
import { CustomPrcExceptionFilter } from 'src/tools/ExceptionFilter';
import { CurrentUserFromWs } from 'src/tools/UserFromWs';

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
