import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserPipe } from './decorator/user-pipe.service';
import { UsersController } from './users.controller';
import { PrcModule } from '../prc/prc.module';
import { HttpModule } from '@nestjs/axios';
import { Game } from '../game/entities/game.entity';

@Module({
  imports: [
    forwardRef(() => PrcModule),
    TypeOrmModule.forFeature([Game, User]),
    HttpModule,
  ],
  providers: [UsersResolver, UsersService, UserPipe],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
