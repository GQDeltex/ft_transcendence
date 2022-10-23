import { Test, TestingModule } from '@nestjs/testing';
import { ChannelUserResolver } from './channel-user.resolver';
import { ChannelService } from '../channel.service';
import { Channel } from '../entities/channel.entity';
import { ChannelUser } from './entities/channel-user.entity';
import { MockRepo } from '../../../tools/memdb.mock';
import { ConfigService } from '@nestjs/config';
import { User } from '../../../users/entities/user.entity';
import { UsersService } from '../../../users/users.service';
import { mockUser } from '../../../users/entities/user.entity.mock';
import { ChannelUserService } from './channel-user.service';
import { PrcGateway } from '../../prc.gateway';

describe('ChannelUserResolver', () => {
  let resolver: ChannelUserResolver;
  let mockRepoChannel: MockRepo;
  let mockRepoChannelUser: MockRepo;
  let mockRepoUser: MockRepo;

  beforeEach(async () => {
    mockRepoChannel = new MockRepo('ChannelUserResolver', Channel);
    mockRepoChannelUser = new MockRepo('ChannelUserResolver', ChannelUser);
    mockRepoUser = new MockRepo('ChannelUserResolver', User, mockUser);
    await mockRepoChannel.setupDb();
    await mockRepoChannelUser.setupDb();
    await mockRepoUser.setupDb();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        ChannelUserResolver,
        ChannelUserService,
        ChannelService,
        UsersService,
        PrcGateway,
        mockRepoChannel.getProvider(),
        mockRepoChannelUser.getProvider(),
        mockRepoUser.getProvider(),
      ],
    }).compile();

    resolver = module.get<ChannelUserResolver>(ChannelUserResolver);
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
