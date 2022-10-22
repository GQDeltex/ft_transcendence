import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentJwtPayload } from '../../../users/decorator/current-jwt-payload.decorator';
import { JwtAuthGuard } from '../../../auth/guard/jwt.guard';
import { TwoFAGuard } from '../../../auth/guard/twoFA.guard';
import { ChannelUserService } from './channel-user.service';
import { ChannelUser } from './entities/channeluser.entity';
import { JwtPayload } from 'src/auth/strategy/jwt.strategy';
import { UsersService } from '../../../users/users.service';

@Resolver(() => ChannelUser)
@UseGuards(JwtAuthGuard, TwoFAGuard)
export class ChannelUserResolver {
  constructor(
    private readonly channelUserService: ChannelUserService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => [ChannelUser], { name: 'channels' })
  findAll() {
    return this.channelUserService.findAll();
  }

  @Mutation(() => ChannelUser)
  async updatePassword(
    @CurrentJwtPayload() JwtUser: JwtPayload,
    channel_name: string,
    newPassword: string,
  ) {
    const user: ChannelUser = await this.usersService.findChannelUser(
      JwtUser.id,
      channel_name,
    );
    await this.channelUserService.updatePassword(user, newPassword);
  }
}
