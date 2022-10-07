import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { toFileStream } from 'qrcode';
import { Response } from 'express';

@Injectable()
export class TwoFactorAuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  public async generateTwoFactorAuthenticationSecret(
    userId: number,
    userEmail: string,
  ) {
    const secret = authenticator.generateSecret();

    const otpauthUrl = authenticator.keyuri(
      userEmail,
      'FT_TRANSCENDENCE',
      secret,
    );
    await this.usersService.setTwoFactorAuthenticationSecret(secret, userId);

    return {
      secret,
      otpauthUrl,
    };
  }

  public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }

  public async enable2FA(userId: number, code: string) {
    const user = await this.usersService.findOne(+userId);

    if (!user) {
      return false;
    }

    const secret = user.twoFactorAuthenticationSecret;
    if (!secret) {
      return false;
    }

    if (!authenticator.verify({ token: code, secret })) return false;

    await this.usersService.set2FAEnable(true, userId);
    return true;
  }
}
