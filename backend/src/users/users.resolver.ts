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
import { UpdateUserUsernameInput } from './dto/update-userusername.input';
import { TwoFAGuard } from '../auth/guard/twoFA.guard';
import { UpdateUserFriendshipInput } from './dto/update-friendship.input';
import { CurrentJwtPayload } from './decorator/current-jwt-payload.decorator';
import { JwtPayload } from '../auth/strategy/jwt.strategy';
import { AllExceptionFilter } from '../tools/ExceptionFilter';
import { UpdateUserBlockingInput } from './dto/update-blocking.input';

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
  findOneById(
    @Args('id', { type: () => Int, nullable: true }) id: number | undefined,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ) {
    if (typeof id === 'undefined')
      return this.usersService.findOne(jwtPayload.id);
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

  @Mutation(() => User)
  async updateBlocking(
    @CurrentJwtPayload() user: JwtPayload,
    @Args() args: UpdateUserBlockingInput,
  ): Promise<User> {
    await this.usersService.updateBlocking(user.id, args.method, args.userId);
    return this.usersService.findOne(user.id);
  }

  @ResolveField(() => [Int], { nullable: 'items' })
  async friends(@Parent() user: User): Promise<number[]> {
    return user.friends;
  }

  @ResolveField(() => [Int], { nullable: 'items' })
  async sentFriendRequests(@Parent() user: User): Promise<number[]> {
    return user.sentFriendRequests;
  }

  @ResolveField(() => [Int], { nullable: 'items' })
  async receivedFriendRequests(@Parent() user: User): Promise<number[]> {
    return user.receivedFriendRequests;
  }

  @ResolveField(() => [Int], { nullable: 'items' })
  async blocks(@Parent() user: User): Promise<number[]> {
    return user.blocks;
  }
}
