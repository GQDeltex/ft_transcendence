import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentJwtPayload } from '../../../users/decorator/current-jwt-payload.decorator';
import { JwtAuthGuard } from '../../../auth/guard/jwt.guard';
import { TwoFAGuard } from '../../../auth/guard/twoFA.guard';
import { ChannelUserService } from './channel-user.service';
import { ChannelUser } from './entities/channel-user.entity';
import { JwtPayload } from 'src/auth/strategy/jwt.strategy';
import { UsersService } from '../../../users/users.service';
import { Channel } from '../entities/channel.entity';
import { ChannelService } from '../channel.service';
import { WsException } from '@nestjs/websockets';

@Resolver(() => ChannelUser)
@UseGuards(JwtAuthGuard, TwoFAGuard)
export class ChannelUserResolver {
  constructor(
    private readonly channelUserService: ChannelUserService,
    private readonly usersService: UsersService,
    private readonly channelService: ChannelService,
  ) {}

  @Query(() => [ChannelUser], { name: 'channelUsers' })
  findAll() {
    return this.channelUserService.findAll();
  }

  @Mutation(() => Channel)
  async updatePassword(
    @CurrentJwtPayload() JwtUser: JwtPayload,
    @Args('channel_name', { type: () => String }) channel_name: string,
    @Args('newPassword', { type: () => String }) newPassword: string,
  ) {
    const channelUser: ChannelUser = await this.usersService.findChannelUser(
      JwtUser.id,
      channel_name,
    );
    if (!channelUser.owner) throw new WsException('Not Channel Owner');
    return await this.channelService.updatePassword(channel_name, newPassword);
  }
}
