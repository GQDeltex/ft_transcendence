import {
  BadRequestException,
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import { GoogleGuard } from '../guard/google.guard';
import { User } from '../../users/entities/user.entity';
import { CreateUserInput } from '../../users/dto/create-user.input';
import { EntityNotFoundError } from 'typeorm';
import { JwtPayload } from '../strategy/jwt.strategy';
import { Response } from 'express';

@Controller('google')
export class GoogleController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  @Get('login')
  @UseGuards(GoogleGuard)
  login(): void {
    return;
  }

  @Get('callback')
  @UseGuards(GoogleGuard)
  async callback(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    if (typeof req.user == 'undefined')
      throw new BadRequestException("Can't find user from google");

    let user: User | CreateUserInput = req.user;
    try {
      user = await this.usersService.findOne(user.username);
      if (user.intraId !== null)
        throw new EntityNotFoundError(User, { id: (user as User).id });
    } catch (error) {
      if (!(error instanceof EntityNotFoundError)) throw error;
      user = await this.usersService.create(req.user);
    }

    const jwt_token = this.jwtService.sign({
      id: (user as User).id,
      email: user.email,
      isAuthenticated: !user.twoFAEnable,
    } as JwtPayload);

    res.cookie('jwt', jwt_token, { httpOnly: true });
    return { isAuthenticated: !user.twoFAEnable };
  }
}
