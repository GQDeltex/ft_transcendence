import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../users/decorator/current-user.decorator';
import { User } from '../../users/entities/user.entity';
import { JwtAuthGuard } from '../../auth/guard/jwt.guard';
import { ChannelService } from './channel.service';
import { CreateChannelInput } from './dto/create-channel.input';
import { Channel } from './entities/channel.entity';
import { TwoFAGuard } from '../../auth/guard/twoFA.guard';

@Resolver(() => Channel)
@UseGuards(JwtAuthGuard, TwoFAGuard)
export class ChannelResolver {
  constructor(private readonly channelService: ChannelService) {}

  @Query(() => [Channel], { name: 'channels' })
  findAll() {
    return this.channelService.findAll();
  }

  @Query(() => Channel, { name: 'channel' })
  findOneById(@Args('id', { type: () => Int }) id: number) {
    return this.channelService.findOne(id);
  }

  @Query(() => Channel, { name: 'channelByName' })
  findOneByChannelname(@Args('name') channelname: string) {
    return this.channelService.findOne(channelname);
  }

  @Mutation(() => Channel)
  async joinChannel(
    @Args() createChannelInput: CreateChannelInput,
    @CurrentUser() user: User,
  ) {
    const result = await this.channelService.join(createChannelInput, user);
    return result;
  }
}
