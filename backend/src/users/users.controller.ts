import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { CurrentJwtPayload } from './decorator/current-jwt-payload.decorator';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { TwoFAGuard } from '../auth/guard/twoFA.guard';
import { JwtPayload } from '../auth/strategy/jwt.strategy';

@Controller('users')
@UseGuards(JwtAuthGuard, TwoFAGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  /*
   * POST Endpoint to upload images, which updates your image url in the database
   *
   * Wants to have a picture as 'multipart/form-data' with a maximum size of 5MiB
   * in the 'picture' field of the form
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('picture', { dest: 'uploads/' }))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5242880 }), // 5MiB
          new FileTypeValidator({ fileType: '(jpeg|jpg|png|gif)$' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @CurrentJwtPayload()
    payload: JwtPayload,
  ) {
    const picture_url = `http://${this.configService.get('DOMAIN')}:8080/${
      file.path
    }`;
    await this.usersService.updatePicture(payload.id, picture_url);
    return { url: picture_url };
  }
}
