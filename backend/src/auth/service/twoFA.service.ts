import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';
import { toFileStream } from 'qrcode';
import { Response } from 'express';

@Injectable()
export class TwoFAService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  public async generate2FASecret(userId: number, userEmail: string) {
    const secret = authenticator.generateSecret();

    const otpauthUrl = authenticator.keyuri(userEmail, 'Pongking', secret);
    await this.usersService.update2FASecret(userId, secret);

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
    if (!user || !user.twoFASecret) {
      return false;
    }

    if (!authenticator.verify({ token: code, secret: user.twoFASecret })) {
      return false;
    }

    await this.usersService.update2FAEnable(userId, true);
    return true;
  }
}
