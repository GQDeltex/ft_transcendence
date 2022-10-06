import { Mutation, Resolver, Query, Args, Int } from '@nestjs/graphql';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserPictureInput } from './dto/update-userpicture.input';
import { UpdateUserUsernameInput } from './dto/update-userusername.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOneById(@Args('id', { type: () => Int }) id: number) {
    const user: User | null = await this.usersService.findOne(id);
    if (user == null)
      throw new HttpException('User not Found', HttpStatus.NOT_FOUND);
    return user;
  }

  @Query(() => User, { name: 'userByName' })
  async findOneByUsername(@Args('username') username: string) {
    const user: User | null = await this.usersService.findOne(username);
    if (user == null)
      throw new HttpException('User not Found', HttpStatus.NOT_FOUND);
    return user;
  }

  @Mutation(() => User)
  updatePicture(@Args('user') updateUserPictureInput: UpdateUserPictureInput) {
    return this.usersService.updatePicture(
      updateUserPictureInput.id,
      updateUserPictureInput.picture,
    );
  }

  @Mutation(() => User)
  updateUsername(
    @Args('user') updateUserUsernameInput: UpdateUserUsernameInput,
  ) {
    this.usersService.updateUsername(
      updateUserUsernameInput.id,
      updateUserUsernameInput.username,
    );
    return this.usersService.findOne(updateUserUsernameInput.id);
  }
}
