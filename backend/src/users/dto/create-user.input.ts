import { InputType, Int, Field } from '@nestjs/graphql';
import { IsUrl, IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @Field(() => Int)
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
}
