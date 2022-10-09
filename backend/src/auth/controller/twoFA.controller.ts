import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
  Res,
  UseGuards,
  Req,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { TwoFAService } from '../service/twoFA.service';
import { Response } from 'express';
import { JwtAuthGuard } from '../guard/jwt.guard';

@Controller('2fa')
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFAController {
  constructor(private readonly twoFAService: TwoFAService) {}

  @Get('generate')
  @UseGuards(JwtAuthGuard)
  async register(@Req() request: any, @Res() response: Response) {
    try {
      const { otpauthUrl } = await this.twoFAService.generate2FASecret(
        request.user.sub,
        request.user.email,
      );
      return this.twoFAService.pipeQrCodeStream(response, otpauthUrl);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('enable')
  @UseGuards(JwtAuthGuard)
  async enable(@Req() request: any, @Query('code') code: string) {
    try {
      return this.twoFAService.enable2FA(request.user.sub, code);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
