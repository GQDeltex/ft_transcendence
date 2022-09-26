import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Intra42OAuthGuard } from '../guard/intra42.guard';
import { Response } from 'express';

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
  ): Promise<any> {
    const {
      user,
    }: {
      user: {
        id: string;
        username: string;
        firstname: string;
        lastname: string;
        email: string;
        authInfo: {
          accessToken: string;
          refreshToken: string;
        };
      };
    } = req;

    const jwt_token = this.jwtService.sign({
      username: user.username,
      sub: user.id,
    });

    res.cookie('jwt', jwt_token);
    return res.status(201).json({ user, jwt_token: jwt_token });
  }
}
