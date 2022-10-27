import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game, GameState } from './entities/game.entity';
import { QueuedPlayer } from './entities/queuedplayer.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    @InjectRepository(QueuedPlayer)
    private readonly queuedPlayerRepository: Repository<QueuedPlayer>,
  ) {}

  findAll(searchState: GameState) {
    return this.gameRepository.find({ where: { state: searchState } });
  }

  findOne(id: number) {
    return this.gameRepository.findOneOrFail({ where: { id: id } });
  }

  async queuePlayer(id: number) {
    await this.queuedPlayerRepository.insert({
      playerId: id,
    });
    console.log(await this.queuedPlayerRepository.find());
  }

  async dequeuePlayer(id: number) {
    await this.queuedPlayerRepository.delete({
      playerId: id,
    });
    console.log('list', await this.queuedPlayerRepository.find());
  }
}
