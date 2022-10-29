import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { Game, GameState } from './entities/game.entity';
import { QueuedPlayer } from './entities/queuedplayer.entity';
import { GameGateway } from './game.gateway';

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
    this.gameGateway.startGame(game);
    console.log('game     list\n', await this.gameRepository.find());
  }

  findAll(searchState: GameState) {
    return this.gameRepository.find({ where: { state: searchState } });
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
    console.log(await this.queuedPlayerRepository.find());
  }

  async dequeuePlayer(id: number) {
    await this.queuedPlayerRepository.delete({
      playerId: id,
    });
    console.log('list', await this.queuedPlayerRepository.find());
  }

  async EndGame(gameId: number, score: number[]) {
    const game: Game = await this.findOne(gameId);
    game.state = GameState.ENDED;
    game.player1.status = 'online';
    game.player2.status = 'online';
    console.log(score);
    game.score1 = score[1];
    game.score2 = score[0];
    await this.gameRepository.save(game);
  }
}
