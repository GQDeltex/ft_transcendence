import { ArgsType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

export enum AllowedUpdateBlockingMethod {
  BLOCK = 'BLOCK',
  UNBLOCK = 'UNBLOCK',
}

registerEnumType(AllowedUpdateBlockingMethod, {
  name: 'AllowedUpdateBlockingMethod',
});

@ArgsType()
export class UpdateUserBlockingInput {
  @IsNotEmpty()
  @Field(() => AllowedUpdateBlockingMethod)
  method: AllowedUpdateBlockingMethod;

  @IsNotEmpty()
  @Field(() => Int)
  userId: number;
}
