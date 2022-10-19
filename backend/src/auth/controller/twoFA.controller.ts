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
  async generate(@Req() req: any, @Res() res: Response): Promise<void> {
    try {
      const { otpauthUrl } = await this.twoFAService.generate2FASecret(
        req.user.id,
        req.user.email,
      );
      return this.twoFAService.pipeQrCodeStream(res, otpauthUrl);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('enable')
  @UseGuards(JwtAuthGuard, TwoFAGuard)
  async enable(
    @Req() req: any,
    @Query('code') code: string | null,
  ): Promise<void> {
    if (!code) throw new BadRequestException('Empty 2FA code');
    try {
      await this.twoFAService.enable2FA(req.user.id, code);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('verify')
  @UseGuards(JwtAuthGuard)
  async verify(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
    @Query('code') code: string | null,
  ) {
    if (req.user.isAuthenticated)
      throw new BadRequestException('User is already authenticated');
    if (!code) throw new BadRequestException('Empty 2FA code');
    try {
      return await this.twoFAService.verify2FA(req.user.id, code).then(() => {
        const jwt_token = this.jwtService.sign({
          username: req.user.username,
          id: req.user.id,
          email: req.user.email,
          isAuthenticated: true,
        });

        res.cookie('jwt', jwt_token, { httpOnly: true });
        return { isAuthenticated: true };
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('disable')
  @UseGuards(JwtAuthGuard, TwoFAGuard)
  async disable(@Req() req: any): Promise<void> {
    try {
      await this.twoFAService.disable2FA(req.user.id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
