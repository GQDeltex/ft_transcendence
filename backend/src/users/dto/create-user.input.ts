import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsUrl } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => Int)
  @IsNotEmpty()
  id: number;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsUrl()
  picture: string;

  @Field()
  campus: string;

  @Field()
  country: string;

  @Field()
  twoFAEnable: boolean;

  @Field(() => [String])
  title: string[];
}
