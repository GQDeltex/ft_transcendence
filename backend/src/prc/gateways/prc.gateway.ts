import {
  WsResponse,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { PrivMsgDto } from '../dtos/privmsg.dto';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { BadRequestExceptionFilter } from './BadRequestExceptionFilter';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
@UseFilters(new BadRequestExceptionFilter())
@UsePipes(new ValidationPipe())
export class PrcGateway {
  @SubscribeMessage('events')
  handleEvent(
    @MessageBody() data: unknown,
    @ConnectedSocket() client: Socket,
  ): WsResponse<unknown> {
    console.log(data);
    console.log(client.id);
    const event = 'events';
    return { event, data };
  }

  @SubscribeMessage('privmsg')
  handlePrivMsg(
    @MessageBody() data: PrivMsgDto,
    @ConnectedSocket() client: Socket,
  ): any {
    const rec = data.recipient;
    const msg = data.message;
    console.log(client.id + ' PRIVMSG ' + rec + ' ' + msg);
    return 'General Kenobi';
  }
}
