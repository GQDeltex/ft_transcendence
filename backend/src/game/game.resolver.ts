import { Resolver } from '@nestjs/graphql';
import { GameService } from './game.service';

@Resolver()
export class GameResolver {
  constructor(private readonly gameService: GameService) {}
}
