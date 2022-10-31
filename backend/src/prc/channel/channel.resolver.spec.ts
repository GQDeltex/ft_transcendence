import { Test, TestingModule } from '@nestjs/testing';
import { ChannelResolver } from './channel.resolver';
import { ChannelService } from './channel.service';
import { Channel } from './entities/channel.entity';
import { ChannelUser } from './channel-user/entities/channel-user.entity';
import { MockRepo } from '../../tools/memdb.mock';
import { ConfigService } from '@nestjs/config';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { PrcGateway } from '../prc.gateway';
import { HttpModule } from '@nestjs/axios';
import { ChannelUserService } from './channel-user/channel-user.service';
import { ChannelUserResolver } from './channel-user/channel-user.resolver';

describe('ChannelResolver', () => {
  let resolver: ChannelResolver;
  let mockRepoChannel: MockRepo;
  let mockRepoChannelUser: MockRepo;
  let mockRepoUser: MockRepo;

  beforeEach(async () => {
    mockRepoChannel = new MockRepo('ChannelResolver', Channel);
    mockRepoChannelUser = new MockRepo('ChannelResolver', ChannelUser);
    mockRepoUser = new MockRepo('ChannelResolver', User);
    await mockRepoChannel.setupDb();
    await mockRepoChannelUser.setupDb();
    await mockRepoUser.setupDb();

    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        ConfigService,
        ChannelResolver,
        ChannelService,
        UsersService,
        PrcGateway,
        ChannelUserService,
        ChannelUserResolver,
        mockRepoChannel.getProvider(),
        mockRepoChannelUser.getProvider(),
        mockRepoUser.getProvider(),
      ],
    }).compile();

    resolver = module.get<ChannelResolver>(ChannelResolver);
  });

  afterEach(async () => {
    await mockRepoChannel.clearRepo();
    await mockRepoChannelUser.clearRepo();
    await mockRepoUser.clearRepo();
  });
  afterAll(async () => {
    await mockRepoChannel.destroyRepo();
    await mockRepoChannelUser.destroyRepo();
    await mockRepoUser.destroyRepo();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
