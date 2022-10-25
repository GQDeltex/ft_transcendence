import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameResolver } from './game.resolver';
import { GameGateway } from './game.gateway';

@Module({
  providers: [GameResolver, GameService, GameGateway],
})
export class GameModule {}
