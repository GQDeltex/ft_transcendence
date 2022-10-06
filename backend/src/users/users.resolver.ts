import { Mutation, Resolver, Query, Args, Int } from '@nestjs/graphql';
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
  findOneById(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Query(() => User, { name: 'userByName' })
  findOneByUsername(@Args('username') username: string) {
    return this.usersService.findOne(username);
  }

  @Mutation(() => User)
  updatePicture(@Args('user') updateUserPictureInput: UpdateUserPictureInput) {
    this.usersService.updatePicture(
      updateUserPictureInput.id,
      updateUserPictureInput.picture,
    );
    return this.usersService.findOne(updateUserPictureInput.id);
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
