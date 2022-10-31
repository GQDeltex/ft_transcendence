import { Test, TestingModule } from '@nestjs/testing';
import { PrcGateway } from './prc.gateway';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { mockUser } from '../users/entities/user.entity.mock';
import { MockRepo } from '../tools/memdb.mock';
import { ConfigService } from '@nestjs/config';
import { ChannelService } from './channel/channel.service';
import { Channel } from './channel/entities/channel.entity';
import { ChannelUser } from './channel/channel-user/entities/channel-user.entity';
import { HttpModule } from '@nestjs/axios';
import { ChannelUserService } from './channel/channel-user/channel-user.service';
import { ChannelUserResolver } from './channel/channel-user/channel-user.resolver';

describe('PrcGateway', () => {
  let gateway: PrcGateway;
  let mockRepoUser: MockRepo;
  let mockRepoChannel: MockRepo;
  let mockRepoChannelUser: MockRepo;

  beforeEach(async () => {
    mockRepoUser = new MockRepo('PrcGateway', User, mockUser);
    mockRepoChannel = new MockRepo('PrcGateway', Channel);
    mockRepoChannelUser = new MockRepo('PrcGateway', ChannelUser);
    await mockRepoUser.setupDb();
    await mockRepoChannel.setupDb();
    await mockRepoChannelUser.setupDb();

    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        ConfigService,
        PrcGateway,
        UsersService,
        ChannelService,
        ChannelUserService,
        ChannelUserResolver,
        mockRepoUser.getProvider(),
        mockRepoChannel.getProvider(),
        mockRepoChannelUser.getProvider(),
      ],
    }).compile();

    gateway = module.get<PrcGateway>(PrcGateway);
  });

  afterEach(async () => {
    await mockRepoUser.clearRepo();
    await mockRepoChannel.clearRepo();
    await mockRepoChannelUser.clearRepo();
  });

  afterAll(async () => {
    await mockRepoUser.destroyRepo();
    await mockRepoChannel.destroyRepo();
    await mockRepoChannelUser.destroyRepo();
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
