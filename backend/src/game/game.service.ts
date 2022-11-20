import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Game, GameLogData, GameState, Vector } from './entities/game.entity';
import { QueuedPlayer } from './entities/queuedplayer.entity';
import { GameGateway } from './game.gateway';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    @InjectRepository(QueuedPlayer)
    private readonly queuedPlayerRepository: Repository<QueuedPlayer>,
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => GameGateway))
    private readonly gameGateway: GameGateway,
  ) {}

  async create(player1: QueuedPlayer, player2: QueuedPlayer) {
    player1.user.status = 'in game';
    player2.user.status = 'in game';
    const game: Game = await this.gameRepository.save({
      state: GameState.RUNNING,
      player1Id: player1.playerId,
      player1: player1.user,
      player2Id: player2.playerId,
      player2: player2.user,
      logData: [],
      totalPauseTime: 0,
    });
    await this.dequeuePlayer(player1.playerId);
    await this.dequeuePlayer(player2.playerId);
    await this.startGame(game);
  }

  async logGameData(
    userId: number,
    name: string,
    time: number,
    gameId: number,
    ballDirection?: Vector,
    ballPosition?: Vector,
    paddleDirection?: number,
    score?: number[],
  ) {
    const game: Game = await this.findOne(gameId);
    const newGameData: GameLogData = new GameLogData();
    if (game.logData.length === 0) {
      game.startTime = new Date();
      newGameData.timestamp = 0;
    } else {
      newGameData.timestamp =
        time - game.startTime.getTime() - game.totalPauseTime;
    }
    newGameData.name = name;
    newGameData.ballDirection =
      ballDirection ?? game.logData[game.logData.length - 1].ballDirection;
    if (userId === game.player2Id)
      newGameData.ballDirection = new Vector(
        -newGameData.ballDirection.x,
        newGameData.ballDirection.y,
      );
    newGameData.ballPosition =
      ballPosition ?? game.logData[game.logData.length - 1].ballPosition;
    newGameData.score = score ?? game.logData[game.logData.length - 1].score;
    newGameData.paddleHostDirection = 0;
    newGameData.paddleClientDirection = 0;
    if (game.logData.length > 0 && userId === game.player2Id) {
      newGameData.paddleHostDirection =
        paddleDirection ??
        game.logData[game.logData.length - 1].paddleHostDirection;
      newGameData.paddleClientDirection =
        game.logData[game.logData.length - 1].paddleClientDirection;
    } else if (game.logData.length > 0) {
      newGameData.paddleClientDirection =
        paddleDirection ??
        game.logData[game.logData.length - 1].paddleClientDirection;
      newGameData.paddleHostDirection =
        game.logData[game.logData.length - 1].paddleHostDirection;
    }
    game.logData.push(newGameData);
    await this.gameRepository.save(game);
  }

  async startGame(game: Game) {
    this.gameGateway.server.to(game.player1.socketId).emit('Game', {
      gameId: game.id,
      player1Id: game.player1.id,
      player2Id: game.player2.id,
      priority: 0,
    });
    this.gameGateway.server.to(game.player2.socketId).emit('Game', {
      gameId: game.id,
      player1Id: game.player1.id,
      player2Id: game.player2.id,
      priority: 1,
    });
    this.gameGateway.server
      .to(game.player1.socketId)
      .socketsJoin(`&${game.id}`);
    this.gameGateway.server
      .to(game.player2.socketId)
      .socketsJoin(`&${game.id}`);
  }

  async findAll(
    searchWhere?: FindOptionsWhere<Game>[] | FindOptionsWhere<Game>,
    searchUserId?: number,
  ) {
    const games: Game[] = await this.gameRepository.find({
      where: searchWhere,
    });
    if (typeof searchUserId === 'undefined') return games;
    return games.filter(
      (game: Game) =>
        game.player1Id == searchUserId || game.player2Id == searchUserId,
    );
  }

  findOne(id: number) {
    return this.gameRepository.findOneOrFail({ where: { id: id } });
  }

  async queuePlayer(id: number) {
    const user: User = await this.usersService.findOne(id);
    if (user.status === 'in game')
      throw new WsException('finish what you started');
    await this.queuedPlayerRepository.insert({
      playerId: id,
      user: user,
    });
  }

  async dequeuePlayer(id: number) {
    await this.queuedPlayerRepository.delete({
      playerId: id,
    });
  }

  async saveScore(gameId: number, score: number[]) {
    const game: Game = await this.findOne(gameId);
    if (game.state == GameState.ENDED) return;
    game.score1 = score[0];
    game.score2 = score[1];
    await this.gameRepository.save(game);
  }

  async endGame(gameId: number, score: number[]) {
    const game: Game = await this.findOne(gameId);
    game.score1 = score[0];
    game.score2 = score[1];
    game.state = GameState.ENDED;
    game.player1.status = 'online';
    game.player1.points += game.score1;
    game.player2.status = 'online';
    game.player2.points += game.score2;
    await this.gameRepository.save(game);
  }

  async killGame(userId: number, time: number): Promise<number> {
    const games: Game[] = await this.findAll(
      [{ state: GameState.RUNNING }, { state: GameState.PAUSED }],
      userId,
    );
    if (games.length <= 0) return -1;
    const game: Game = games[0];
    if (game.state === GameState.PAUSED) {
      game.logData = game.logData.filter((gameData, idx) => {
        if (gameData.ballDirection.x === 0) {
          game.totalPauseTime += time - game.logData[idx].timestamp;
          return false;
        }
        return true;
      });
    }
    game.state = GameState.ENDED;
    game.player1.status = 'online';
    game.player2.status = 'online';
    if (game.player1.id === userId) {
      game.score1 = 0;
      game.player2.points += game.score2;
    }
    if (game.player2.id === userId) {
      game.score2 = 0;
      game.player1.points += game.score1;
    }
    //what do you mean you can't do multiple constructor overloads in typescript??
    const newGameData = new GameLogData();
    const lastLog: GameLogData = game.logData[game.logData.length - 1];
    newGameData.timestamp =
      time - game.startTime.getTime() - game.totalPauseTime;
    newGameData.score = [game.score1, game.score2];
    newGameData.name = 'kill';
    newGameData.ballDirection = lastLog.ballDirection;
    newGameData.ballPosition = lastLog.ballPosition;
    newGameData.paddleClientDirection = lastLog.paddleClientDirection;
    newGameData.paddleHostDirection = lastLog.paddleHostDirection;
    game.logData.push(newGameData);
    await this.gameRepository.save(game);
    return game.id;
  }

  async pauseGame(
    client: Socket,
    gameId: number,
    cowardId: number,
    time: number,
  ) {
    const game: Game = await this.findOne(gameId);
    if (game.state === GameState.ENDED) return;
    if (game.player1Id === cowardId) game.player1BlurTime = new Date();
    if (game.player2Id === cowardId) game.player2BlurTime = new Date();
    if (game.state !== GameState.PAUSED) {
      const newGameData = new GameLogData();
      newGameData.timestamp = time;
      newGameData.name = 'pause';
      game.logData.push(newGameData);
      console.log('on paused', newGameData);
    }
    game.state = GameState.PAUSED;
    await this.gameRepository.save(game);
    client.to(`&${gameId}`).emit('gameBlur', cowardId);
    client.emit('gameBlur', cowardId);
  }

  async unpauseGame(
    client: Socket,
    gameId: number,
    cowardId: number,
    time: number,
  ) {
    const game: Game = await this.findOne(gameId);
    if (game.state !== GameState.PAUSED) return;
    if (game.player1Id === cowardId) game.player1BlurTime = new Date(0);
    if (game.player2Id === cowardId) game.player2BlurTime = new Date(0);
    if (game.player1BlurTime.getTime() === game.player2BlurTime.getTime()) {
      game.logData = game.logData.filter((gameData, idx) => {
        if (gameData.ballDirection.x === 0) {
          game.totalPauseTime += time - game.logData[idx].timestamp;
          console.log('to be filtered: ', gameData);
          console.log(game.totalPauseTime);
          return false;
        }
        return true;
      });
      game.state = GameState.RUNNING;
      client.to(`&${gameId}`).emit('gameFocus');
      client.emit('gameFocus');
    }
    await this.gameRepository.save(game);
  }

  async claimVictory(client: Socket, gameId: number, time: number) {
    const game: Game = await this.findOne(gameId);
    if (client.data.user.id == game.player1Id) {
      if (time - game.player2BlurTime.getTime() >= 10000)
        await this.killGame(game.player2Id, time);
    } else {
      if (time - game.player1BlurTime.getTime() >= 10000)
        await this.killGame(game.player1Id, time);
    }
    client.to(`&${gameId}`).emit('Game', { gameId: -1 });
    client.emit('Game', { gameId: -1 });
  }

  async handleBigGameDataRequest(
    clientId: number,
    gameId: number,
    requesterId?: number,
    leftPaddle?: any,
    rightPaddle?: any,
    ball?: any,
    scores?: number[],
  ) {
    const game: Game = await this.findOne(gameId);
    if (typeof scores === 'undefined' || typeof requesterId === 'undefined') {
      this.gameGateway.server.to(game.player1.socketId).emit('onStreamJoin', {
        requesterId: clientId,
      });
    } else {
      const requester: User = await this.usersService.findOne(requesterId);
      this.gameGateway.server.to(requester.socketId).emit('onStreamJoin', {
        gameId,
        leftPaddle,
        rightPaddle,
        ball,
        scores,
      });
    }
  }
}
