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
import { EntityNotFoundError } from 'typeorm';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { JwtAuthGuard } from '../guard/jwt.guard';

@Controller('42intra')
export class Intra42Controller {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  @Get('login')
  @UseGuards(Intra42OAuthGuard)
  intra42Login(): void {
    return;
  }

  @Get('callback')
  @UseGuards(Intra42OAuthGuard)
  async intra42AuthRedirect(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (typeof req.user == 'undefined')
      throw new BadRequestException("Can't find user from 42 intra");

    let user: User | CreateUserInput = req.user;
    try {
      user = await this.usersService.findOne(+user.id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        await this.usersService.create(user);
      } else {
        throw error;
      }
    }

    const jwt_token = this.jwtService.sign({
      username: user.username,
      sub: user.id,
      email: user.email,
    });

    res.cookie('jwt', jwt_token, { httpOnly: true });
    return { id: +user.id };
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res({ passthrough: true }) res: Response): void {
    res.clearCookie('jwt', { httpOnly: true });
  }
}
