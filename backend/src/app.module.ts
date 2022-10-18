import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { PrcModule } from './prc/prc.module';
import { User } from './users/entities/user.entity';
import { ChannelUser } from './prc/channel/entities/channeluser.entity';
import { Channel } from './prc/channel/entities/channel.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Channel, ChannelUser],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    UsersModule,
    AuthModule,
    PrcModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
