import { IsNotEmpty } from 'class-validator';

export class PrivMsgDto {
  @IsNotEmpty()
  recipient: string;

  @IsNotEmpty()
  message: string;
}
