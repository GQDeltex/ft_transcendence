import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameResolver } from './game.resolver';
import { GameGateway } from './game.gateway';
import { Game } from './entities/game.entity';
import { QueuedPlayer } from './entities/queuedplayer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Game, QueuedPlayer])],
  providers: [GameResolver, GameService, GameGateway],
})
export class GameModule {}
