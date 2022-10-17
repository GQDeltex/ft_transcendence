import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { UsersService } from '../../users/users.service';
import { toFileStream } from 'qrcode';
import { Response } from 'express';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class TwoFAService {
  constructor(private readonly usersService: UsersService) {}

  async generate2FASecret(userId: number, userEmail: string) {
    const user: User = await this.usersService.findOne(userId);
    if (user.twoFAEnable) throw new Error('2FA is already enabled.');

    const secret = authenticator.generateSecret();

    const otpauthUrl = authenticator.keyuri(userEmail, 'Pongking', secret);
    await this.usersService.update2FASecret(userId, secret);

    return {
      secret,
      otpauthUrl,
    };
  }

  async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }

  async enable2FA(userId: number, code: string): Promise<void> {
    const user: User = await this.usersService.findOne(userId);
    if (user.twoFAEnable) throw new Error('2FA is already enabled.');

    if (!user.twoFASecret)
      throw new Error('Empty 2FA Secret but pending 2FA enable');

    if (!authenticator.verify({ token: code, secret: user.twoFASecret }))
      throw new Error('Invalid 2FA code');

    await this.usersService.update2FAEnable(userId, true);
  }

  async verify2FA(userId: number, code: string): Promise<void> {
    const user: User = await this.usersService.findOne(userId);

    if (!user.twoFAEnable) return;

    if (!user.twoFASecret)
      throw new Error('Fatal error: empty 2FA Secret but 2FA is enabled.');

    if (!authenticator.verify({ token: code, secret: user.twoFASecret }))
      throw new Error('Invalid 2FA code');
  }

  async disable2FA(userId: number): Promise<void> {
    const user: User = await this.usersService.findOne(userId);
    if (!user.twoFAEnable) throw new Error('2FA is not enabled.');

    await this.usersService.update2FAEnable(userId, false);
  }
}
