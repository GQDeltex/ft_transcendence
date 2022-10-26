import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { PrcModule } from './prc/prc.module';
import { User } from './users/entities/user.entity';
import { ChannelUser } from './prc/channel/channel-user/entities/channel-user.entity';
import { Channel } from './prc/channel/entities/channel.entity';
import { HealthModule } from './health/health.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GameModule } from './game/game.module';
import { Game } from './game/entities/game.entity';
import { QueuedPlayer } from './game/entities/queuedplayer.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads/',
      serveStaticOptions: {
        index: false,
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: 'src/schema.gql',
      cors: {
        origin: `http://${process.env.DOMAIN}`,
        credentials: true,
      },
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Channel, ChannelUser, Game, QueuedPlayer],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    UsersModule,
    AuthModule,
    PrcModule,
    HealthModule,
    GameModule,
  ],
  controllers: [],
})
export class AppModule {}
