import {
  BadRequestException,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TwoFAService } from '../service/twoFA.service';
import { Response } from 'express';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { TwoFAGuard } from '../guard/twoFA.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('2fa')
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFAController {
  constructor(
    private readonly twoFAService: TwoFAService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('generate')
  @UseGuards(JwtAuthGuard, TwoFAGuard)
  async register(
    @Req() request: any,
    @Res({ passthrough: true }) response: Response,
  ) {
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
  @UseGuards(JwtAuthGuard, TwoFAGuard)
  async enable(
    @Req() request: any,
    @Query('code') code: string | null,
  ): Promise<void> {
    if (!code) throw new BadRequestException('Empty 2FA code');
    try {
      await this.twoFAService.enable2FA(request.user.id, code);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('verify')
  @UseGuards(JwtAuthGuard)
  async verify(
    @Req() request: any,
    @Res({ passthrough: true }) response: Response,
    @Query('code') code: string | null,
  ): Promise<void> {
    if (request.user.isAuthenticated)
      return response.redirect('http://localhost/login');
    if (!code) throw new BadRequestException('Empty 2FA code');
    try {
      await this.twoFAService
        .verify2FA(request.user.id, code)
        .then((isVerified) => {
          if (!isVerified) throw new BadRequestException('Wrong 2FA code');

          const jwt_token = this.jwtService.sign({
            username: request.user.username,
            id: request.user.id,
            email: request.user.email,
            isAuthenticated: true,
          });

          response.cookie('jwt', jwt_token);
          return response.redirect('http://localhost/login');
        });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('disabl')
  @UseGuards(JwtAuthGuard, TwoFAGuard)
  async disable(
    @Req() request: any,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    try {
      await this.twoFAService.disable2FA(request.user.id);
      return response.redirect('http://localhost/login');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
