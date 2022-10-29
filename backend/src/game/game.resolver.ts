import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { GameService } from './game.service';
import { Game, GameState } from './entities/game.entity';
import { TwoFAGuard } from '../auth/guard/twoFA.guard';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
@UseGuards(JwtAuthGuard, TwoFAGuard)
export class GameResolver {
  constructor(private readonly gameService: GameService) {}

  @Query(() => [Game], { name: 'games' })
  findAll(
    @Args('state', { nullable: true }) searchState: GameState,
    @Args('user', { nullable: true }) userId: number,
  ) {
    return this.gameService.findAll(searchState, userId);
  }

  @Query(() => Game, { name: 'game' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.gameService.findOne(id);
  }
}
