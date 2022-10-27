import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../users/decorator/current-user.decorator';
import { User } from '../../users/entities/user.entity';
import { JwtAuthGuard } from '../../auth/guard/jwt.guard';
import { ChannelService } from './channel.service';
import { CreateChannelInput, LeaveChannelInput } from './channel.input';
import { Channel } from './entities/channel.entity';
import { TwoFAGuard } from '../../auth/guard/twoFA.guard';
import { CurrentJwtPayload } from '../../users/decorator/current-jwt-payload.decorator';
import { JwtPayload } from '../../auth/strategy/jwt.strategy';

@Resolver(() => Channel)
@UseGuards(JwtAuthGuard, TwoFAGuard)
export class ChannelResolver {
  constructor(private readonly channelService: ChannelService) {}

  @Query(() => [Channel], { name: 'channels' })
  findAll(@CurrentJwtPayload() user: JwtPayload) {
    return this.channelService.findJoined(user.id);
  }

  @Query(() => Channel, { name: 'channel' })
  findOneById(@Args('id', { type: () => Int }) id: number) {
    return this.channelService.findOne(id);
  }

  @Query(() => Channel, { name: 'channelByName' })
  findOneByChannelName(@Args('name') channelName: string) {
    return this.channelService.findOne(channelName);
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
}
