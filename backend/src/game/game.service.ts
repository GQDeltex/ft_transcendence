import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game, GameState } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
  ) {}

  findAll(searchState: GameState) {
    return this.gameRepository.find({ where: { state: searchState } });
  }

  findOne(id: number) {
    return this.gameRepository.findOneOrFail({ where: { id: id } });
  }
}
