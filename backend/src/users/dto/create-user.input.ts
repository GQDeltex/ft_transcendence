import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsUrl } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => Int)
  intraId: number | null;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  intra: string | null;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  @IsNotEmpty()
  username: string;

  @Field(() => [String])
  title: string[];

  @Field()
  @IsUrl()
  picture: string;

  @Field()
  default_picture?: string;

  @Field()
  campus: string;

  @Field()
  country: string;

  @Field()
  coalition: string;

  @Field()
  twoFAEnable: boolean;
}
