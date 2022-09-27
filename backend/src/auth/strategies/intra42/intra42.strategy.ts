import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UsersDto } from '../../../users/dtos/users/users.dto';

// passport-42 doesn't have @type module for typescript
/* eslint-disable */
// @ts-ignore
import { Strategy, VerifyCallBack } from 'passport-42';

@Injectable()
export class Intra42Strategy extends PassportStrategy(Strategy, 'intra42') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('INTRA42_AUTH_ID'),
      clientSecret: configService.get<string>('INTRA42_AUTH_SECRET'),
      callbackURL: configService.get<string>('INTRA42_AUTH_CALLBACK_URL'),
      scope: ['public'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallBack,
  ): Promise<void> {
    const user: UsersDto = {
      id: profile.id,
      username: profile.username,
      firstname: profile.name.givenName,
      lastname: profile.name.familyName,
      email: profile.emails[0].value,
      picture: profile._json.image_url,
      campus: profile._json.campus[0].name,
      country: profile._json.campus[0].country,
    };

    done(null, user);
  }
}
