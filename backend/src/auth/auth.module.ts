import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Intra42Controller } from './controllers/intra42/intra42.controller';
import { Intra42Strategy } from './strategies/intra42/intra42.strategy';
import { JwtStrategy } from './strategies/jwt/jwt.strategy';
import { UsersModule } from '../users/users.module';

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
  providers: [JwtStrategy, Intra42Strategy],
  controllers: [Intra42Controller],
})
export class AuthModule {}
