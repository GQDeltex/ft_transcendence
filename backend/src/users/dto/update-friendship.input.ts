import { ArgsType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

export enum AllowedUpdateFriendshipMethod {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  ACCEPT = 'ACCEPT',
  DECLINE = 'DECLINE',
  CANCEL = 'CANCEL',
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
