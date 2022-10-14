import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { CreateUserInput } from '../../users/dto/create-user.input';

// passport-42 doesn't have @type module for typescript
/* eslint-disable */
// @ts-ignore
import { Strategy, VerifyCallBack } from 'passport-42';
import { InputTypeFactory } from '@nestjs/graphql/dist/schema-builder/factories/input-type.factory';

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
    const user: CreateUserInput = {
      id: profile.id,
      username: profile.username,
      firstname: profile.name.givenName,
      lastname: profile.name.familyName,
      email: profile.emails[0].value,
      picture: profile._json.image_url,
      campus: profile._json.campus[0].name,
      country: profile._json.campus[0].country,
      title: clean_42_title(
        profile._json.titles,
        titusPullus(profile._json.titles_users),
      ),
    };
    done(null, user);
  }
}

function clean_42_title(input: { id: number; name: string }[], index : number) {
  var tmp: string;
  var output: string[] = [''];

  input.forEach((item: { id: number; name: string }) => {
    tmp = item.name;
    tmp = tmp.replace('%login', '');
    tmp = tmp.replace(',', '');
    tmp = tmp.trim();
    output.push(tmp);
  });
  if (index >= 0)
    output[0] = output[index + 1];
  return output;
}

function titusPullus(input: { id : number; user_id : number; title_id : number; selected : boolean; created_at : string; updated_at : string}[]) {
  let i :number = 0;
  while ( i < input.length) {
    if (input[i].selected === true)
      return (i);
    i++;
  }
  return (-1);
}
