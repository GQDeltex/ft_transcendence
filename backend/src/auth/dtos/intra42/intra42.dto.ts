import { IsEmail, IsNotEmpty } from 'class-validator';

class Intra42ApiLoginAuthInfo {
  @IsNotEmpty()
  accessToken: string;

  @IsNotEmpty()
  refreshToken: string;
}

export class Intra42ApiLoginResponse {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  email: string;

  authInfo: Intra42ApiLoginAuthInfo;
}
