import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UseFilters, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserPictureInput } from './dto/update-userpicture.input';
import { UpdateUserUsernameInput } from './dto/update-userusername.input';
import { TwoFAGuard } from '../auth/guard/twoFA.guard';
import { UpdateUserFriendshipInput } from './dto/update-friendship.input';
import { CurrentJwtPayload } from './decorator/current-jwt-payload.decorator';
import { JwtPayload } from '../auth/strategy/jwt.strategy';
import { AllExceptionFilter } from '../tools/ExceptionFilter';

@UseFilters(new AllExceptionFilter())
@Resolver(() => User)
@UseGuards(JwtAuthGuard, TwoFAGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOneById(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Query(() => User, { name: 'userByName' })
  findOneByUsername(@Args('username') username: string) {
    return this.usersService.findOne(username);
  }

  @Query(() => User, { name: 'userChannelList' })
  async findUserChannelList(@Args('username') username: string) {
    return await this.usersService.findUserChannelList(username);
  }

  @Mutation(() => User)
  async updatePicture(
    @Args() updateUserPictureInput: UpdateUserPictureInput,
    @CurrentJwtPayload() user: JwtPayload,
  ) {
    await this.usersService.updatePicture(
      user.id,
      updateUserPictureInput.picture,
    );
    return this.usersService.findOne(user.id);
  }

  @Mutation(() => User)
  async updateUsername(
    @Args() updateUserUsernameInput: UpdateUserUsernameInput,
    @CurrentJwtPayload() user: JwtPayload,
  ) {
    await this.usersService.updateUsername(
      user.id,
      updateUserUsernameInput.username,
    );
    return this.usersService.findOne(user.id);
  }

  @Mutation(() => User)
  async updateFriendship(
    @CurrentJwtPayload() user: JwtPayload,
    @Args() args: UpdateUserFriendshipInput,
  ): Promise<User> {
    await this.usersService.updateFriendship(
      user.id,
      args.method,
      args.friendId,
    );
    return this.usersService.findOne(user.id);
  }

  @ResolveField(() => [User])
  async friends(@Parent() user: User): Promise<User[]> {
    if (
      typeof user.following === 'undefined' ||
      typeof user.followers === 'undefined'
    )
      return [];
    return user.followers.filter((follower) =>
      user.following.some((following) => following.id === follower.id),
    );
  }

  @ResolveField(() => [User])
  async sentFriendRequests(@Parent() user: User): Promise<User[]> {
    if (
      typeof user.following === 'undefined' ||
      typeof user.followers === 'undefined'
    )
      return [];
    return user.following.filter(
      (following) =>
        !user.followers.some((follower) => follower.id === following.id),
    );
  }

  @ResolveField(() => [User])
  async receivedFriendRequests(@Parent() user: User): Promise<User[]> {
    if (
      typeof user.following === 'undefined' ||
      typeof user.followers === 'undefined'
    )
      return [];
    return user.followers.filter(
      (follower) =>
        !user.following.some((following) => following.id === follower.id),
    );
  }
}
