import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
  Res,
  UseGuards,
  Req,
  Get,
  Query,
} from '@nestjs/common';
import { TwoFactorAuthenticationService } from './twoFactorAuthentication.service';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';

@Controller('2fa')
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFactorAuthenticationController {
  constructor(
    private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
  ) {}

  @Get('generate')
  @UseGuards(JwtAuthGuard)
  async register(@Req() request: any, @Res() response: Response) {
    const { otpauthUrl } =
      await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(
        request.user.sub,
        request.user.email,
      );
    return this.twoFactorAuthenticationService.pipeQrCodeStream(
      response,
      otpauthUrl,
    );
  }

  @Get('enable')
  @UseGuards(JwtAuthGuard)
  async enable(@Req() request: any, @Query('code') code: string) {
    return this.twoFactorAuthenticationService.enable2FA(
      request.user.sub, //id of the user
      code,
    );
  }
}
