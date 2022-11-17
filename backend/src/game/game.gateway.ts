import {
  forwardRef,
  Inject,
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
  WsException,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsJwt2FAAuthGuard } from '../auth/guard/wsJwt.guard';
import { JwtPayload } from '../auth/strategy/jwt.strategy';
import { CustomPrcExceptionFilter } from '../tools/ExceptionFilter';
import { CurrentUserFromWs } from '../tools/UserFromWs';
import { Game } from './entities/game.entity';
import { GameService } from './game.service';

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
export class GameGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(forwardRef(() => GameService))
    private readonly gameService: GameService,
  ) {}

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    if (typeof client.data.user === 'undefined') return;
    await this.gameService.dequeuePlayer(+client.data.user.id);
    const gameId = await this.gameService.killGame(+client.data.user.id);
    if (gameId == -1) return;
    const otherSockets = await this.server.in(`&${gameId}`).fetchSockets();
    otherSockets.forEach((socket) => {
      socket.emit('Game', { gameId: -1 });
    });
  }

  @SubscribeMessage('blur')
  async handleBlur(
    @ConnectedSocket() client: Socket,
    @MessageBody('gameId') gameId: number,
    @MessageBody('cowardId') cowardId: number,
  ) {
    await this.gameService.pauseGame(client, gameId, cowardId);
  }

  @SubscribeMessage('focus')
  async handleFocus(
    @ConnectedSocket() client: Socket,
    @MessageBody('gameId') gameId: number,
    @MessageBody('cowardId') cowardId: number,
  ) {
    await this.gameService.unpauseGame(client, gameId, cowardId);
  }

  @SubscribeMessage('claimVictory')
  async claimVictory(
    @ConnectedSocket() client: Socket,
    @MessageBody('gameId') gameId: number,
  ) {
    await this.gameService.claimVictory(client, gameId);
  }

  @SubscribeMessage('gameData')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody('name') name: number,
    @MessageBody('gameId') gameId: number,
    @MessageBody('direction') direction?: { x: number; y: number },
    @MessageBody('position') position?: { x: number; y: number },
    @MessageBody('paddleDir') paddleDir?: number,
    @MessageBody('score') score?: number[],
  ) {
    if (typeof score !== 'undefined') {
      if (score[0] >= 10 || score[1] >= 10) {
        await this.gameService.endGame(gameId, score);
        client.to(`&${gameId}`).emit('Game', { gameId: -1 });
        client.emit('Game', { gameId: -1 });
        return;
      } else {
        await this.gameService.saveScore(gameId, score);
      }
    }

    const payload = {
      direction,
      position,
      paddleDir,
      score,
      name,
      from: client.data.user.id,
    };
    client.to(`&${gameId}`).emit('gameData', payload);
    console.log(payload);
  }

  @SubscribeMessage('queue')
  async handleQueueIn(
    @ConnectedSocket() client: Socket,
    @CurrentUserFromWs() jwtPayload: JwtPayload,
    @MessageBody('event') event: string,
  ) {
    if (event === 'JOIN') {
      await this.gameService.queuePlayer(jwtPayload.id);
    } else if (event === 'LEAVE') {
      await this.gameService.dequeuePlayer(jwtPayload.id);
      const gameId = await this.gameService.killGame(+client.data.user.id);
      if (gameId == -1) return;
      const otherSockets = await this.server.in(`&${gameId}`).fetchSockets();
      otherSockets.forEach((socket) => {
        socket.emit('Game', { gameId: -1 });
      });
    }
  }

  @SubscribeMessage('stream')
  async handleStream(
    @ConnectedSocket() client: Socket,
    @CurrentUserFromWs() jwtPayload: JwtPayload,
    @MessageBody('event') event: string,
    @MessageBody('gameId') gameId: number,
  ) {
    if (event === 'JOIN') {
      const game: Game = await this.gameService.findOne(gameId);
      client.join(`&${gameId}`);
      return { player1Id: game.player1.id, player2Id: game.player2.id };
    } else {
      client.leave(`&${gameId}`);
    }
  }

  @SubscribeMessage('inviteReady')
  async handleInviteGame(
    @ConnectedSocket() client: Socket,
    @CurrentUserFromWs() jwtPayload: JwtPayload,
    @MessageBody('gameId') gameId: number,
  ) {
    const game: Game = await this.gameService.findOne(gameId);
    await this.startGame(game);
  }

  async startGame(game: Game) {
    const p1sockets = await this.server
      .in(game.player1.socketId)
      .fetchSockets();
    if (p1sockets.length < 1)
      throw new WsException('Could not find Recipients socket');
    const p2sockets = await this.server
      .in(game.player2.socketId)
      .fetchSockets();
    if (p2sockets.length < 1)
      throw new WsException('Could not find Recipients socket');

    p1sockets[0].emit('Game', {
      gameId: game.id,
      player1Id: game.player1.id,
      player2Id: game.player2.id,
      priority: 0,
    });
    p2sockets[0].emit('Game', {
      gameId: game.id,
      player1Id: game.player1.id,
      player2Id: game.player2.id,
      priority: 1,
    });
    p1sockets[0].join(`&${game.id}`);
    p2sockets[0].join(`&${game.id}`);
  }
}
