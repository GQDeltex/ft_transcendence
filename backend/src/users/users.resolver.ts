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
import { UpdateUsernameInput } from './dto/update-username.input';
import { TwoFAGuard } from '../auth/guard/twoFA.guard';
import { UpdateUserFriendshipInput } from './dto/update-friendship.input';
import { CurrentJwtPayload } from './decorator/current-jwt-payload.decorator';
import { JwtPayload } from '../auth/strategy/jwt.strategy';
import { AllExceptionFilter } from '../tools/ExceptionFilter';
import { UpdateUserBlockingInput } from './dto/update-blocking.input';
import itemList, { Item } from './entities/item.entity';
import { UpdateUserEquippedItemsInput } from './dto/update-equipped-items.input';
import { UpdateGameRequestInput } from './dto/update-gamerequest.input';
import { CurrentUser } from './decorator/current-user.decorator';
import { ConfigService } from '@nestjs/config';

@UseFilters(new AllExceptionFilter())
@Resolver(() => User)
@UseGuards(JwtAuthGuard, TwoFAGuard)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

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

  @Query(() => [User], { name: 'leaders' })
  async findLeaders() {
    return await this.usersService.findLeaders();
  }

  @Mutation(() => User)
  async updateUsername(
    @CurrentJwtPayload() jwtPayload: JwtPayload,
    @Args() updateUserUsernameInput: UpdateUsernameInput,
  ) {
    await this.usersService.updateUsername(
      jwtPayload.id,
      updateUserUsernameInput.username,
    );
    return this.usersService.findOne(jwtPayload.id);
  }

  @Mutation(() => User)
  async updateTitle(
    @CurrentJwtPayload() jwtPayload: JwtPayload,
    @Args('title', { type: () => String }) updateTitleInput: string,
  ) {
    await this.usersService.updateTitle(jwtPayload.id, updateTitleInput);
    return this.usersService.findOne(jwtPayload.id);
  }

  @Mutation(() => User)
  async updateFriendship(
    @CurrentJwtPayload() jwtPayload: JwtPayload,
    @Args() args: UpdateUserFriendshipInput,
  ): Promise<User> {
    await this.usersService.updateFriendship(
      jwtPayload.id,
      args.method,
      args.friendId,
    );
    return this.usersService.findOne(jwtPayload.id);
  }

  @Mutation(() => User)
  async updateBlocking(
    @CurrentJwtPayload() jwtPayload: JwtPayload,
    @Args() args: UpdateUserBlockingInput,
  ): Promise<User> {
    await this.usersService.updateBlocking(
      jwtPayload.id,
      args.method,
      args.userId,
    );
    return this.usersService.findOne(jwtPayload.id);
  }

  @Query(() => [Item])
  getItems(): Item[] {
    return itemList;
  }

  @Mutation(() => User)
  async updateInventory(
    @CurrentJwtPayload() jwtPayload: JwtPayload,
    @Args('orderId', { type: () => String }) orderId: string,
  ): Promise<User> {
    return this.usersService.updateInventory(jwtPayload.id, orderId);
  }

  @Mutation(() => User)
  async updateEquippedItems(
    @CurrentJwtPayload() jwtPayload: JwtPayload,
    @Args() updateUserEquippedItemsInput: UpdateUserEquippedItemsInput,
  ): Promise<User> {
    return this.usersService.updateEquippedItems(
      jwtPayload.id,
      updateUserEquippedItemsInput,
    );
  }

  @Mutation(() => User)
  async updateGameRequest(
    @CurrentJwtPayload() jwtPayload: JwtPayload,
    @Args() updateGameRequestInput: UpdateGameRequestInput,
  ): Promise<User> {
    await this.usersService.updateGameRequest(
      jwtPayload.id,
      updateGameRequestInput,
    );
    return await this.usersService.findOne(jwtPayload.id);
  }

  @Mutation(() => User)
  async resetPicture(@CurrentUser() user: User) {
    user.picture = user.default_picture;
    await this.usersService.updatePicture(user.id, user.default_picture);
    return user;
  }

  @ResolveField(() => String)
  async status(
    @CurrentJwtPayload() jwtPayload: JwtPayload,
    @Parent() user: User,
  ): Promise<string> {
    if (jwtPayload.id === user.id) return user.status;
    if (
      user.following_id?.includes(jwtPayload.id) &&
      user.followers_id?.includes(jwtPayload.id)
    )
      return user.status;
    return 'offline';
  }

  @ResolveField(() => Int)
  async rank(@Parent() user: User): Promise<number> {
    return this.usersService.findRank(user);
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
    return user.blocking_id ?? [];
  }

  @ResolveField(() => [Int], { nullable: 'items' })
  async blockedBy(@Parent() user: User): Promise<number[]> {
    return user.blockedBy_id ?? [];
  }

  @ResolveField(() => [Item], { nullable: 'items' })
  async equipped(@Parent() user: User): Promise<Item[]> {
    return itemList.filter((item) => user.equipped.includes(item.id));
  }

  @ResolveField(() => [Int], { nullable: 'items' })
  async inventory(@Parent() user: User): Promise<number[]> {
    const isPaypalEnable = +(
      this.configService.get<number>('PAYPAL_ENABLE') ?? 0
    );
    if (typeof isPaypalEnable === 'undefined' || isPaypalEnable === 0)
      return itemList.map((item) => item.id);
    return user.inventory;
  }
}
