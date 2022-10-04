import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Intra42OAuthGuard } from './guard/intra42.guard';
import { Response } from 'express';
import { CreateUserInput } from '../users/dto/create-user.input';
import { UsersService } from '../users/users.service';

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
  ): Promise<void> {
    const user: CreateUserInput = req.user;
    this.usersService.create(user);
    const jwt_token = this.jwtService.sign({
      username: user.username,
      sub: user.id,
    });

    res.cookie('jwt', jwt_token);
    return res.redirect('http://localhost/login');
  }
}
