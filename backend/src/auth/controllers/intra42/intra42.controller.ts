import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Intra42OAuthGuard } from '../../guards/intra42/intra42.guard';
import { Response } from 'express';
import { UsersDto } from '../../../users/dtos/users/users.dto';
import { UsersService } from '../../../users/services/users/users.service';

@Controller('login')
export class Intra42Controller {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

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
    const user: UsersDto = req.user;
    this.usersService.createUser(user);
    const jwt_token = this.jwtService.sign({
      username: user.username,
      sub: user.id,
    });

    res.cookie('jwt', jwt_token);
    return res.status(201).json({ user, jwt_token: jwt_token });
  }
}
