import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserPipe } from './decorator/user-pipe.service';
import { UsersController } from './users.controller';
import { PrcModule } from '../prc/prc.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    forwardRef(() => PrcModule),
    TypeOrmModule.forFeature([User]),
    HttpModule,
    ConfigModule,
  ],
  providers: [UsersResolver, UsersService, UserPipe],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
