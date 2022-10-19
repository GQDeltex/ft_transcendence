import { ArgsType, Field } from '@nestjs/graphql';
import { IsUrl, IsNotEmpty } from 'class-validator';

@ArgsType()
export class UpdateUserPictureInput {
  @IsNotEmpty()
  @IsUrl()
  @Field()
  picture: string;
}
