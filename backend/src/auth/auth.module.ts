import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Intra42Controller } from './intra42.controller';
import { Intra42Strategy } from './strategy/intra42.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { TwoFactorAuthenticationController } from '../2FA/twoFactorAuthentication.controller';
import { TwoFactorAuthenticationService } from '../2FA/twoFactorAuthentication.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
          },
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  providers: [JwtStrategy, Intra42Strategy, TwoFactorAuthenticationService],
  controllers: [Intra42Controller, TwoFactorAuthenticationController],
})
export class AuthModule {}
