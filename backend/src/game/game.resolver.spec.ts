import { Test, TestingModule } from '@nestjs/testing';
import { GameResolver } from './game.resolver';
import { GameService } from './game.service';
import { Game } from './entities/game.entity';
import { QueuedPlayer } from './entities/queuedplayer.entity';
import { mockGame } from './entities/game.entity.mock';
import { User } from '../users/entities/user.entity';
import { mockUser } from '../users/entities/user.entity.mock';
import { MockDB } from '../tools/memdbv2.mock';
import { UsersService } from '../users/users.service';
import { GameGateway } from './game.gateway';
import { ConfigService } from '@nestjs/config';
import { PrcGateway } from '../prc/prc.gateway';
import { ChannelService } from '../prc/channel/channel.service';
import { Channel } from '../prc/channel/entities/channel.entity';
import { ChannelUser } from '../prc/channel/channel-user/entities/channel-user.entity';
import { HttpModule } from '@nestjs/axios';
import { ChannelUserService } from '../prc/channel/channel-user/channel-user.service';

describe('GameResolver', () => {
  let resolver: GameResolver;
  let mockDB: MockDB;

  beforeEach(async () => {
    mockDB = await new MockDB('GameResolver').setupDB();
    await mockDB.prefillDB(User, [mockUser]);
    await mockDB.prefillDB(Game, [mockGame]);

    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        await mockDB.getProvider(Game),
        await mockDB.getProvider(QueuedPlayer),
        await mockDB.getProvider(User),
        await mockDB.getProvider(Channel),
        await mockDB.getProvider(ChannelUser),
        GameResolver,
        GameService,
        ConfigService,
        UsersService,
        GameGateway,
        PrcGateway,
        ChannelService,
        ChannelUserService,
      ],
    }).compile();

    resolver = module.get<GameResolver>(GameResolver);
  });

  afterEach(async () => {
    await mockDB.destroySource();
  });

  afterAll(async () => {
    await mockDB.destroyDB();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
