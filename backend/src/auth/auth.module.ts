import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Intra42Controller } from './controller/intra42.controller';
import { Intra42Strategy } from './strategy/intra42.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { TwoFAController } from './controller/twoFA.controller';
import { TwoFAService } from './service/twoFA.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
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
  providers: [JwtStrategy, Intra42Strategy, ConfigService, TwoFAService],
  controllers: [Intra42Controller, TwoFAController],
})
export class AuthModule {}
