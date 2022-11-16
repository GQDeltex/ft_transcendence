import { ArgsType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

export enum AllowedUpdateGameRequestMethod {
  SEND = 'SEND',
  ACCEPT = 'ACCEPT',
  DECLINE = 'DECLINE',
  CANCEL = 'CANCEL',
}

registerEnumType(AllowedUpdateGameRequestMethod, {
  name: 'AllowedUpdateGameRequestMethod',
});

@ArgsType()
export class UpdateGameRequestInput {
  @IsNotEmpty()
  @Field(() => AllowedUpdateGameRequestMethod)
  method: AllowedUpdateGameRequestMethod;

  @IsNotEmpty()
  @Field(() => Int)
  userId: number;
}
