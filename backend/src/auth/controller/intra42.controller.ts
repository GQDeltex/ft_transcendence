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
import { CreateUserInput } from '../../users/dto/create-user.input';
import { JwtPayload } from '../strategy/jwt.strategy';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom } from 'rxjs';

@Controller('42intra')
export class Intra42Controller {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly httpService: HttpService,
  ) {}

  @Get('login')
  @UseGuards(Intra42OAuthGuard)
  login(): void {
    return;
  }

  @Get('callback')
  @UseGuards(Intra42OAuthGuard)
  async callback(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    if (typeof req.user == 'undefined')
      throw new BadRequestException("Can't find user from 42 intra");

    let user: User | CreateUserInput = req.user;
    try {
      user = await this.usersService.findOne(+user.id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        user.coalition = await this.fetchCoalition(
          +user.id,
          req.user.accessToken,
        );
        await this.usersService.create(user);
      } else {
        throw error;
      }
    }

    const jwt_token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      isAuthenticated: !user.twoFAEnable,
    } as JwtPayload);

    res.cookie('jwt', jwt_token, { httpOnly: true });
    return { isAuthenticated: !user.twoFAEnable };
  }

  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response): void {
    res.clearCookie('jwt', { httpOnly: true });
  }

  private async fetchCoalition(
    userId: number,
    accessToken: string,
  ): Promise<string> {
    const { data } = await lastValueFrom(
      this.httpService
        .get(`https://api.intra.42.fr/v2/users/${userId}/coalitions`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .pipe(
          catchError((error) => {
            if (typeof error.response === 'undefined')
              throw new BadRequestException(error.response?.data);
            else throw new BadRequestException(error.message);
          }),
        ),
    );
    if (data.length < 1 || typeof data[0].image_url === 'undefined')
      return 'Fluvius';
    const coalition = data[0].image_url
      .replace(/^.*[\\\/]/, '')
      .replace(/\.[^/.]+$/, '');
    if (coalition.length === 0) return 'Fluvius';
    return coalition;
  }
}
