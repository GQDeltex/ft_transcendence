import {
  Mutation,
  Resolver,
  Query,
  Args,
  Int,
  GqlExceptionFilter,
  GqlArgumentsHost,
} from '@nestjs/graphql';
import { Catch, ArgumentsHost, UseFilters, UseGuards } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserPictureInput } from './dto/update-userpicture.input';
import { UpdateUserUsernameInput } from './dto/update-userusername.input';
import { TwoFAGuard } from '../auth/guard/twoFA.guard';
import { CurrentJwtPayload } from './decorator/current-jwt-payload.decorator';
import { JwtPayload } from '../auth/strategy/jwt.strategy';

@Catch(EntityNotFoundError)
export class CatchOurExceptionsFilter implements GqlExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    GqlArgumentsHost.create(host);
    return exception;
  }
}

@UseFilters(new CatchOurExceptionsFilter())
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
    const result: User = await this.usersService.findUserChannelList(username);
    return result;
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
}
