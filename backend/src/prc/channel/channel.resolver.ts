import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtPayload } from 'src/auth/strategy/jwt.strategy';
import { CurrentJwtPayload } from 'src/users/decorator/current-jwt-payload.decorator';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from '../../auth/guard/jwt.guard';
import { ChannelService } from './channel.service';
import { CreateChannelInput } from './dto/create-channel.input';
import { Channel } from './entities/channel.entity';

@Resolver(() => Channel)
//@UseGuards(JwtAuthGuard)
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
  async createChannel(@Args() createChannelInput: CreateChannelInput) {
    const id = await this.channelService.create(createChannelInput);
    return this.channelService.findOne(id);
  }

  @Mutation(() => Channel)
  async joinChannel(@Args() createChannelInput: CreateChannelInput, @CurrentJwtPayload() jwtUser: JwtPayload) {
    const result = await this.channelService.join(createChannelInput, );
    return result;
  }
}
