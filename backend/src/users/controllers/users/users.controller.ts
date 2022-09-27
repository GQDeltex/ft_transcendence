import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/guards/jwt/jwt.guard';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  findUsersById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUsersById(id);
  }
}
