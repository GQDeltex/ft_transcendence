import { forwardRef, Module } from '@nestjs/common';
import { PrcGateway } from './prc.gateway';
import { UsersModule } from '../users/users.module';
import { ChannelService } from './channel/channel.service';
import { ChannelResolver } from './channel/channel.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelUser } from './channel/entities/channeluser.entity';
import { Channel } from './channel/entities/channel.entity';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([Channel, ChannelUser]),
  ],
  providers: [PrcGateway, ChannelService, ChannelResolver],
  exports: [PrcGateway],
})
export class PrcModule {}
