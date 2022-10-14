import {
  HttpException,
  HttpStatus,
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Intra42OAuthGuard } from '../guard/intra42.guard';
import { Response } from 'express';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';

@Controller('login')
export class Intra42Controller {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
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
    if (typeof req.user == 'undefined')
      throw new HttpException('User missing', HttpStatus.BAD_REQUEST);
    let user: User = req.user;
    try {
      user = await this.usersService.findOne(+user.id);
    } catch {
      this.usersService.create(user);
    }
    // use 'user' object for 2FA here
    const jwt_token = this.jwtService.sign({
      username: user.username,
      sub: user.id,
      email: user.email,
    });

    res.cookie('jwt', jwt_token);
    return res.redirect(`http://${this.configService.get<string>("DOMAIN")}/login`);
  }
}
