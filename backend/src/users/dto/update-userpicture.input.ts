import { InputType, Field, Int } from '@nestjs/graphql';
import { IsUrl, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateUserPictureInput {
  @IsNotEmpty()
  @Field(() => Int)
  id: number;

  @IsNotEmpty()
  @IsUrl()
  @Field()
  picture: string;
}
