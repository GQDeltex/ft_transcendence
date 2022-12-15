import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { TwoFAGuard } from '../auth/guard/twoFA.guard';
import { GameService } from './game.service';
import { CurrentJwtPayload } from '../users/decorator/current-jwt-payload.decorator';
import { JwtPayload } from '../auth/strategy/jwt.strategy';

@Controller('game')
@UseGuards(JwtAuthGuard, TwoFAGuard)
export class GameController {
  constructor(
    private readonly configService: ConfigService,
    private readonly gameService: GameService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('game', { dest: 'uploads/' }))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5242880 }), // 5MiB
          new FileTypeValidator({ fileType: 'webm' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @CurrentJwtPayload()
    payload: JwtPayload,
    @Query('gameId') gameId: string,
  ) {
    const gameUrl = `http://${this.configService.get('DOMAIN')}:8080/${
      file.path
    }`;
    await this.gameService.uploadGame(payload.id, +gameId, gameUrl);
    return { url: gameUrl };
  }
}
