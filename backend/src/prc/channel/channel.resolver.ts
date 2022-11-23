import { UseFilters, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CurrentUser } from '../../users/decorator/current-user.decorator';
import { User } from '../../users/entities/user.entity';
import { JwtAuthGuard } from '../../auth/guard/jwt.guard';
import { ChannelService } from './channel.service';
import {
  CreateChannelInput,
  KickChannelUserInput,
  LeaveChannelInput,
  ToggleChannelPpInput,
} from './channel.input';
import { Channel } from './entities/channel.entity';
import { TwoFAGuard } from '../../auth/guard/twoFA.guard';
import { CurrentJwtPayload } from '../../users/decorator/current-jwt-payload.decorator';
import { JwtPayload } from '../../auth/strategy/jwt.strategy';
import { AllExceptionFilter } from '../../tools/ExceptionFilter';

@Resolver(() => Channel)
@UseGuards(JwtAuthGuard, TwoFAGuard)
@UseFilters(new AllExceptionFilter())
export class ChannelResolver {
  constructor(private readonly channelService: ChannelService) {}

  @Query(() => [Channel], { name: 'channels' })
  findAll(@CurrentJwtPayload() user: JwtPayload) {
    return this.channelService.findJoined(user.id);
  }

  @ResolveField('password', () => Boolean)
  async hasPassword(@Parent() channel: Channel): Promise<boolean> {
    return channel.password != '';
  }

  /*
  It creates a mutation that allows a user to join a channel.
  */
  @Mutation(() => Channel)
  async joinChannel(
    @Args() createChannelInput: CreateChannelInput,
    @CurrentUser() user: User,
  ) {
    return await this.channelService.join(createChannelInput, user);
  }

  @Mutation(() => Channel, { nullable: true })
  async leaveChannel(
    @Args() leaveChannelInput: LeaveChannelInput,
    @CurrentUser() user: User,
  ): Promise<Channel | null> {
    return await this.channelService.leave(leaveChannelInput.name, user);
  }

  @Mutation(() => Channel)
  async kickChannelUser(
    @Args() kickChannelUserInput: KickChannelUserInput,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ): Promise<Channel> {
    return await this.channelService.kickChannelUser(
      jwtPayload.id,
      kickChannelUserInput.channelName,
      kickChannelUserInput.userId,
    );
  }

  @Mutation(() => Channel)
  async updateChannelPublic(
    @Args() toggleChannelPpInput: ToggleChannelPpInput,
    @CurrentUser() user: User,
  ) {
    return await this.channelService.toggleChannel(toggleChannelPpInput, user);
  }
}
