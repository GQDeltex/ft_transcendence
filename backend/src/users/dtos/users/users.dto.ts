import { IsUrl, IsEmail, IsNotEmpty } from 'class-validator';

export class UsersDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  email: string;

  @IsUrl()
  picture: string;

  @IsNotEmpty()
  campus: string;

  @IsNotEmpty()
  country: string;
}
