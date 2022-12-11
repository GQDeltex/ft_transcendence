import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { CreateUserInput } from '../../users/dto/create-user.input';

// passport-42 doesn't have @type module for typescript
/* eslint-disable */
// @ts-ignore
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_AUTH_ID'),
      clientSecret: configService.get<string>('GOOGLE_AUTH_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_AUTH_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<void> {
    const user: CreateUserInput = {
      intraId: null,
      intra: null,
      email: profile.emails[0].value,
      username: profile.emails[0].value.split('@')[0],
      firstname: profile.name.givenName,
      lastname: profile.name.familyName,
      picture: profile.photos[0].value,
      title: [],
      campus: 'Wolfsburg',
      country: 'Germany',
      coalition: 'Fluvius',
      twoFAEnable: false,
    };
    done(null, user);
  }
}
