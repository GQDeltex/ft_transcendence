import { UseFilters, UseGuards } from '@nestjs/common';
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
import { AllExceptionFilter } from '../../../tools/ExceptionFilter';

@Resolver(() => ChannelUser)
@UseGuards(JwtAuthGuard, TwoFAGuard)
@UseFilters(new AllExceptionFilter())
export class ChannelUserResolver {
  constructor(
    private readonly channelUserService: ChannelUserService,
    private readonly usersService: UsersService,
    private readonly channelService: ChannelService,
  ) {}

  @Query(() => [ChannelUser], { name: 'channelUsers' })
  findAll(@CurrentJwtPayload() jwtPayload: JwtPayload) {
    return this.channelUserService.findAll(jwtPayload.id);
  }

  @Query(() => [ChannelUser], { name: 'channelUsersInChannel' })
  findChannelUsersInChannel(
    @Args('channelName', { type: () => String }) channelName: string,
  ): Promise<ChannelUser[]> {
    return this.channelUserService.findAllInChannel(channelName);
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
    if (typeof channelUser === 'undefined')
    throw new WsException('ChannelUser undefined');
  if (channelUser.ban)
    throw new WsException(
      'You are temporarly banned. Please wait till you are no longer banned',
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
    if (channelUserAdmin.ban)
      throw new WsException(
        'You are temporarly banned. Please wait till you are no longer banned',
      );
    const channelUserNew: ChannelUser = await this.usersService.findChannelUser(
      newAdmin,
      channel_name,
    );
    if (typeof channelUserNew === 'undefined')
      throw new WsException('ChannelUserNew undefined');
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
    @CurrentJwtPayload() jwtPayload: JwtPayload,
    @Args('channel_name', { type: () => String }) channel_name: string,
    @Args('banUser', { type: () => Int }) banUser: number,
  ) {
    if (jwtPayload.id === banUser)
      throw new WsException(`${jwtPayload.id} cannot ban themself`);
    const channelBanUser: ChannelUser = await this.usersService.findChannelUser(
      jwtPayload.id,
      channel_name,
    );
    if (typeof channelBanUser === 'undefined')
      throw new WsException('channelBanUser undefined');
    if (channelBanUser.ban)
      throw new WsException(
        'You are temporarly banned. Please wait till you are no longer banned',
      );
    const channelUserNew: ChannelUser = await this.usersService.findChannelUser(
      banUser,
      channel_name,
    );
    if (typeof channelUserNew === 'undefined')
      throw new WsException('channelBanUserNew undefined');
    if (!channelBanUser.admin)
      throw new WsException(
        jwtPayload.id + ' is not a Channel Admin on ' + channel_name,
      );
    if (channelUserNew.owner)
      throw new WsException(
        `${channelBanUser.user_id} does not have permission to ban an owner`,
      );
    if (channelUserNew.admin && !channelBanUser.owner)
      throw new WsException(
        `${channelBanUser.user_id} does not have permission to ban an admin`,
      );
    if (channelUserNew.ban)
      throw new WsException(banUser + ' is already banned on ' + channel_name);
    return await this.channelUserService.updateBan(channelUserNew);
  }

  @Mutation(() => ChannelUser)
  async updateMute(
    @CurrentJwtPayload() JwtUser: JwtPayload,
    @Args('channel_name', { type: () => String }) channel_name: string,
    @Args('muteUser', { type: () => Int }) muteUser: number,
  ) {
    const channelMuteUser: ChannelUser =
      await this.usersService.findChannelUser(JwtUser.id, channel_name);
    if (typeof channelMuteUser === 'undefined')
      throw new WsException('channelMuteUser undefined');
    if (channelMuteUser.ban)
      throw new WsException(
        'You are temporarly banned. Please wait till you are no longer banned',
      );
    const channelUserNew: ChannelUser = await this.usersService.findChannelUser(
      muteUser,
      channel_name,
    );
    if (typeof channelUserNew === 'undefined')
      throw new WsException('channelMuteUserNew undefined');
    if (channelMuteUser.id == channelUserNew.id)
      throw new WsException(`${channelMuteUser.user_id} cannot mute itself`);
    //console.log('both users are good'); //DEBUG
    if (!channelMuteUser.admin)
      throw new WsException(
        JwtUser.id + ' is not a Channel Admin on ' + channel_name,
      );
    if (channelUserNew.owner)
      throw new WsException(
        `${channelMuteUser.user_id} does not have permission to mute an owner`,
      );
    if (channelUserNew.admin && !channelMuteUser.owner)
      throw new WsException(
        `${channelMuteUser.user_id} does not have permission to mute an admin`,
      );
    if (channelUserNew.mute)
      throw new WsException(muteUser + ' is already muted on ' + channel_name);
    return await this.channelUserService.updateMute(channelUserNew);
  }
}
