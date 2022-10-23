import { Module } from '@nestjs/common';
import { PrcGateway } from './prc.gateway';
import { UsersModule } from '../users/users.module';
import { ChannelService } from './channel/channel.service';
import { ChannelResolver } from './channel/channel.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelUser } from './channel/channel-user/entities/channeluser.entity';
import { Channel } from './channel/entities/channel.entity';
import { ChannelUserService } from './channel/channel-user/channel-user.service';
import { ChannelUserResolver } from './channel/channel-user/channel-user.resolver';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Channel, ChannelUser])],
  providers: [
    PrcGateway,
    ChannelService,
    ChannelResolver,
    ChannelUserService,
    ChannelUserResolver,
  ],
})
export class PrcModule {}
