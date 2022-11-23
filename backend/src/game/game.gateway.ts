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
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsJwt2FAAuthGuard } from '../auth/guard/wsJwt.guard';
import { CustomPrcExceptionFilter } from '../tools/ExceptionFilter';
import { Game } from './entities/game.entity';
import { GameService } from './game.service';

@UsePipes(new ValidationPipe())
@WebSocketGateway({
  cors: {
    origin: `http://${process.env.DOMAIN}`,
    methods: ['GET', 'POST'],
    credentials: true,
  },
  maxHttpBufferSize: 5e6, // 5MiB
  pingTimeout: 60000,
})
@UseGuards(WsJwt2FAAuthGuard)
@UseFilters(CustomPrcExceptionFilter)
export class GameGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  public readonly server: Server;

  constructor(
    @Inject(forwardRef(() => GameService))
    private readonly gameService: GameService,
  ) {}

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    if (typeof client.data.user === 'undefined') return;
    await this.gameService.dequeuePlayer(client.data.user.id);
    const games: Game[] = await this.gameService.killGame(client.data.user.id);
    games.forEach((game) => {
      this.server.to(`&${game.id}`).emit('Game', { gameId: -1 });
    });
  }

  @SubscribeMessage('gameBlur')
  async handleBlur(
    @ConnectedSocket() client: Socket,
    @MessageBody('gameId') gameId: number,
    @MessageBody('cowardId') cowardId: number,
  ) {
    await this.gameService.pauseGame(client, gameId, cowardId);
  }

  @SubscribeMessage('gameFocus')
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
    @MessageBody('name') name: string,
    @MessageBody('gameId') gameId: number,
    @MessageBody('direction') direction?: { x: number; y: number },
    @MessageBody('position') position?: { x: number; y: number },
    @MessageBody('paddleDir') paddleDir?: number,
    @MessageBody('score') score?: number[],
  ) {
    if (typeof score !== 'undefined') {
      if (score[0] >= 2 || score[1] >= 2) {
        await this.gameService.endGame(gameId, score);
        client.to(`&${gameId}`).emit('Game', { gameId: -1 });
        client.emit('Game', { gameId: -1 });
        return;
      } else {
        await this.gameService.saveScore(gameId, score);
      }
    }

    client.to(`&${gameId}`).emit('gameData', {
      name,
      direction,
      position,
      paddleDir,
      score,
      from: client.data.user.id,
    });
  }

  @SubscribeMessage('queue')
  async handleQueueIn(
    @ConnectedSocket() client: Socket,
    @MessageBody('event') event: string,
  ) {
    if (event === 'JOIN') {
      await this.gameService.queuePlayer(client.data.user.id);
    } else if (event === 'LEAVE') {
      await this.gameService.dequeuePlayer(client.data.user.id);
      const games: Game[] = await this.gameService.killGame(
        client.data.user.id,
      );
      games.forEach((game) => {
        this.server.to(`&${game.id}`).emit('Game', {
          gameId: -1,
        });
      });
    }
  }

  @SubscribeMessage('stream')
  async handleStream(
    @ConnectedSocket() client: Socket,
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
    @MessageBody('gameId') gameId: number,
  ) {
    const game: Game = await this.gameService.findOne(gameId);
    await this.gameService.startGame(game);
  }

  @SubscribeMessage('onStreamJoin')
  async handleBigGameDataRequest(
    @ConnectedSocket() client: Socket,
    @MessageBody('gameId') gameId: number,
    @MessageBody('requesterId') requesterId?: number,
    @MessageBody('leftPaddle') leftPaddle?: any,
    @MessageBody('rightPaddle') rightPaddle?: any,
    @MessageBody('ball') ball?: any,
    @MessageBody('scores') scores?: number[],
  ) {
    await this.gameService.handleBigGameDataRequest(
      client.data.user.id,
      gameId,
      requesterId,
      leftPaddle,
      rightPaddle,
      ball,
      scores,
    );
  }

  @SubscribeMessage('uploadGame')
  async handleUploadGame(
    @ConnectedSocket() client: Socket,
    @MessageBody('gameId') gameId: number,
    @MessageBody('file') fileBuffer: Buffer,
  ) {
    await this.gameService.uploadGame(client.data.user.id, gameId, fileBuffer);
  }
}
