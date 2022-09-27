import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Intra42OAuthGuard } from '../../guards/intra42/intra42.guard';
import { Response } from 'express';
import { Intra42ApiLoginResponse } from '../../dtos/intra42/intra42.dto';

@Controller('login')
export class Intra42Controller {
  constructor(private readonly jwtService: JwtService) {}

  @Get()
  @UseGuards(Intra42OAuthGuard)
  async login(): Promise<void> {
    return;
  }

  @Get('redirect')
  @UseGuards(Intra42OAuthGuard)
  async intra42AuthRedirect(
    @Req() req: any,
    @Res() res: Response,
  ): Promise<Response> {
    const user: Intra42ApiLoginResponse = req.user;
    const jwt_token = this.jwtService.sign({
      username: user.username,
      sub: user.id,
    });

    res.cookie('jwt', jwt_token);
    return res.status(201).json({ user, jwt_token: jwt_token });
  }
}
