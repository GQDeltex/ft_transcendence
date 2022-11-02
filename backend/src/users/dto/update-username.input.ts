import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, Length, Matches } from 'class-validator';

@ArgsType()
export class UpdateUsernameInput {
  @IsNotEmpty()
  @Field()
  @Length(1, 20)
  @Matches('^[a-zA-Z0-9\\_\\-]+$')
  username: string;
}
