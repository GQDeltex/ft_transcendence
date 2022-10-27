import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
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

  @Mutation(() => ChannelUser)
  async updateAdmin(
    @CurrentJwtPayload() JwtUser: JwtPayload,
    @Args('channel_name', { type: () => String }) channel_name: string,
    @Args('newAdmin', { type: () => Int }) newAdmin: number,
  ) {
    const channelUserAdmin: ChannelUser =
      await this.usersService.findChannelUser(JwtUser.id, channel_name);
    if (typeof channelUserAdmin === 'undefined')
      throw new WsException('ChannelUserAdmin undefined');
    const channelUserNew: ChannelUser = await this.usersService.findChannelUser(
      newAdmin,
      channel_name,
    );
    if (typeof channelUserNew === 'undefined')
      throw new WsException('ChannelUserNew undefined');
    //console.log('both users are good'); //DEBUG
    if (!channelUserAdmin.admin)
      throw new WsException(
        JwtUser.id + ' is not a Channel Admin on ' + channel_name,
      );
    if (channelUserNew.admin)
      throw new WsException(
        newAdmin + ' is already an Admin on ' + channel_name,
      );
    return await this.channelUserService.updateAdmin(channelUserNew);
  }

  @Mutation(() => ChannelUser)
  async updateBan(
    @CurrentJwtPayload() JwtUser: JwtPayload,
    @Args('channel_name', { type: () => String }) channel_name: string,
    @Args('banUser', { type: () => Int }) banUser: number,
  ) {
    const channelBanUser: ChannelUser = await this.usersService.findChannelUser(
      JwtUser.id,
      channel_name,
    );
    if (typeof channelBanUser === 'undefined')
      throw new WsException('channelBanUser undefined');
    const channelUserNew: ChannelUser = await this.usersService.findChannelUser(
      banUser,
      channel_name,
    );
    if (typeof channelUserNew === 'undefined')
      throw new WsException('channelBanUserNew undefined');
    //console.log('both users are good'); //DEBUG
    if (!channelBanUser.admin)
      throw new WsException(
        JwtUser.id + ' is not a Channel Admin on ' + channel_name,
      );
    if (channelUserNew.ban)
      throw new WsException(banUser + ' is already banned on ' + channel_name);
    return await this.channelUserService.updateBan(channelUserNew);
  }
}
