import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameResolver } from './game.resolver';
import { GameGateway } from './game.gateway';
import { Game } from './entities/game.entity';
import { QueuedPlayer } from './entities/queuedplayer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { QueuedPlayerSubscriber } from './queue.subscriber';
import { GameController } from './game.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Game, QueuedPlayer]), UsersModule],
  providers: [GameResolver, GameService, GameGateway, QueuedPlayerSubscriber],
  controllers: [GameController],
})
export class GameModule {}
