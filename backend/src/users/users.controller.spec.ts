import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { mockUser } from './entities/user.entity.mock';
import { MockRepo } from '../tools/memdb.mock';
import { ConfigService } from '@nestjs/config';
import { Channel } from '../prc/channel/entities/channel.entity';
import { PrcGateway } from '../prc/prc.gateway';
import { ChannelService } from '../prc/channel/channel.service';
import { ChannelUser } from '../prc/channel/channel-user/entities/channel-user.entity';
import { HttpModule } from '@nestjs/axios';
import { Game } from '../game/entities/game.entity';
import { ChannelUserService } from '../prc/channel/channel-user/channel-user.service';

describe('UsersController', () => {
  let controller: UsersController;
  let mockRepoUser: MockRepo;
  let mockRepoChannel: MockRepo;
  let mockRepoChannelUser: MockRepo;
  let mockRepoGame: MockRepo;

  beforeEach(async () => {
    mockRepoUser = new MockRepo('UsersController', User, mockUser);
    mockRepoChannel = new MockRepo('UsersController', Channel);
    mockRepoChannelUser = new MockRepo('UsersController', ChannelUser);
    mockRepoGame = new MockRepo('UsersController', Game);
    await mockRepoUser.setupDb();
    await mockRepoChannel.setupDb();
    await mockRepoChannelUser.setupDb();
    await mockRepoGame.setupDb();

    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        UsersService,
        ConfigService,
        PrcGateway,
        ChannelService,
        ChannelUserService,
        mockRepoUser.getProvider(),
        mockRepoChannel.getProvider(),
        mockRepoChannelUser.getProvider(),
        mockRepoGame.getProvider(),
      ],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterEach(async () => {
    await mockRepoUser.clearRepo();
    await mockRepoChannel.clearRepo();
    await mockRepoChannelUser.clearRepo();
    await mockRepoGame.clearRepo();
  });

  afterAll(async () => {
    await mockRepoUser.destroyRepo();
    await mockRepoChannel.destroyRepo();
    await mockRepoChannelUser.destroyRepo();
    await mockRepoGame.destroyRepo();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
