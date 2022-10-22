import { Module } from '@nestjs/common';
import { PrcGateway } from './prc.gateway';
import { UsersModule } from '../users/users.module';
import { ChannelService } from './channel/channel.service';
import { ChannelResolver } from './channel/channel.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelUser } from './channel/channel-user/entities/channeluser.entity';
import { Channel } from './channel/entities/channel.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Channel, ChannelUser])],
  providers: [PrcGateway, ChannelService, ChannelResolver],
})
export class PrcModule {}
