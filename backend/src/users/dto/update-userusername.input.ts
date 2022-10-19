import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';

@ArgsType()
export class UpdateUserUsernameInput {
  @IsNotEmpty()
  @Field()
  @Length(1, 42)
  username: string;
}
