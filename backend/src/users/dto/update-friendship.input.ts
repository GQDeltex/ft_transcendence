import { ArgsType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

export enum AllowedUpdateFriendshipMethod {
  ADD = 'add',
  REMOVE = 'remove',
  ACCEPT = 'accept',
  DECLINE = 'decline',
  CANCEL = 'cancel',
}

registerEnumType(AllowedUpdateFriendshipMethod, {
  name: 'AllowedUpdateFriendshipMethod',
});

@ArgsType()
export class UpdateUserFriendshipInput {
  @IsNotEmpty()
  @Field(() => AllowedUpdateFriendshipMethod)
  method: AllowedUpdateFriendshipMethod;

  @IsNotEmpty()
  @Field(() => Int)
  friendId: number;
}
