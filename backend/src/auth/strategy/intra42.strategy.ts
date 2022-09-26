import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

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
    const { id, username, name, emails }: {
      id: string;
      username: string;
      name: {
        givenName: string;
        familyName: string;
      };
      emails: [{value: string}];
    } = profile;

    const user: {
      id: string;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      authInfo: {
        accessToken: string;
        refreshToken: string;
      }
    } = {
      id: id,
      username: username,
      firstName: name.givenName,
      lastName: name.familyName,
      email: emails[0].value,
      authInfo: {
        accessToken: accessToken,
        refreshToken: refreshToken
      }
    };

    done(null, user);
  }
}
