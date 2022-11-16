import { Injectable, PipeTransform } from '@nestjs/common';
import { UsersService } from '../users.service';
import { JwtPayload } from '../../auth/strategy/jwt.strategy';

@Injectable()
export class UserPipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) {}

  async transform(jwtPayload: JwtPayload) {
    return await this.usersService.findOne(jwtPayload.id);
  }
}
