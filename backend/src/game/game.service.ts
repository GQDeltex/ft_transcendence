import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Game, GameState } from './entities/game.entity';
import { QueuedPlayer } from './entities/queuedplayer.entity';
import { GameGateway } from './game.gateway';
import { Socket } from 'socket.io';

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
    });
    await this.dequeuePlayer(player1.playerId);
    await this.dequeuePlayer(player2.playerId);
    await this.gameGateway.startGame(game);
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
    if (user.status === 'in game') throw new Error('finish what you started');
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
    // if the game has already ended, don't try to write the score
    if (game.state == GameState.ENDED) return;
    game.score1 = score[1];
    game.score2 = score[0];
    await this.gameRepository.save(game);
  }

  async endGame(gameId: number, score: number[]) {
    const game: Game = await this.findOne(gameId);
    game.score1 = score[1];
    game.score2 = score[0];
    game.state = GameState.ENDED;
    game.player1.status = 'online';
    game.player1.points += game.score1;
    game.player2.status = 'online';
    game.player2.points += game.score2;
    await this.gameRepository.save(game);
  }

  async killGame(userId: number): Promise<number> {
    const games: Game[] = await this.findAll(
      [{ state: GameState.RUNNING }, { state: GameState.PAUSED }],
      userId,
    );
    if (games.length <= 0) return -1;
    const game: Game = games[0];
    game.state = GameState.ENDED;
    game.player1.status = 'online';
    game.player2.status = 'online';
    if (game.player1.id == userId) {
      game.score1 = 0;
      game.player2.points += game.score2;
    }
    if (game.player2.id == userId) {
      game.score2 = 0;
      game.player1.points += game.score1;
    }
    await this.gameRepository.save(game);
    return game.id;
  }
  async pauseGame(client: Socket, gameId: number, cowardId: number) {
    const game: Game = await this.findOne(gameId);
    if (game.state === GameState.ENDED) return;
    if (game.player1Id === cowardId) game.player1BlurTime = new Date();
    if (game.player2Id === cowardId) game.player2BlurTime = new Date();
    game.state = GameState.PAUSED; //order problems? pls think about it
    await this.gameRepository.save(game);
    client.to(`&${gameId}`).emit('blur', cowardId);
    client.emit('blur', cowardId);
  }
  async unpauseGame(client: Socket, gameId: number) {
    const game: Game = await this.findOne(gameId);
    if (game.state !== GameState.PAUSED) return;
    game.state = GameState.RUNNING; //order problems? pls think about it
    await this.gameRepository.save(game);
    client.to(`&${gameId}`).emit('focus');
    client.emit('focus');
  }
}
