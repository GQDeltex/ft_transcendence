import { ArgsType, Field } from '@nestjs/graphql';
import { IsAscii, IsNotEmpty, Length, Matches } from 'class-validator';

@ArgsType()
export class CreateChannelInput {
  @Field()
  @IsNotEmpty()
  @IsAscii()
  @Length(2, 42)
  @Matches('^[#][a-zA-Z0-9\\_\\-\\.]+$')
  name: string;

  @Field()
  password: string;
}

@ArgsType()
export class LeaveChannelInput {
  @Field()
  @IsNotEmpty()
  @IsAscii()
  @Length(2, 42)
  @Matches('^[#][a-zA-Z0-9\\_\\-\\.]+$')
  name: string;
}

@ArgsType()
export class ToggleChannelPpInput {
  @Field()
  @IsNotEmpty()
  @IsAscii()
  @Length(2, 42)
  @Matches('^[#][a-zA-Z0-9\\_\\-\\.]+$')
  channelName: string;

  @Field()
  private: boolean;
}
