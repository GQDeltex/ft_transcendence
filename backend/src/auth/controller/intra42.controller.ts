import {
  BadRequestException,
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
import { CreateUserInput } from '../../users/dto/create-user.input';

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
    if (typeof req.user == 'undefined')
      throw new BadRequestException('Fatal error: user is missing.');
    let user: User | CreateUserInput = req.user;

    const userData: User | null = await this.usersService.findOne(user.id);

    if (userData == null) {
      await this.usersService.create(user);
    } else {
      user = userData;
    }

    const jwt_token = this.jwtService.sign({
      username: user.username,
      id: user.id,
      email: user.email,
      isAuthenticated: !user.twoFAEnable,
    });

    res.cookie('jwt', jwt_token);
    return res.redirect('http://localhost/login');
  }
}
