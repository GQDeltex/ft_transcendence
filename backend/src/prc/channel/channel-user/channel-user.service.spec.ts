import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrcGateway } from '../../../prc/prc.gateway';
import { UsersService } from '../../../users/users.service';
import { MockRepo } from '../../../tools/memdb.mock';
import { ChannelService } from '../channel.service';
import { ChannelUserService } from './channel-user.service';
import { ChannelUser } from './entities/channel-user.entity';
import { ChannelResolver } from '../channel.resolver';
import { ChannelUserResolver } from './channel-user.resolver';
import { Channel } from '../entities/channel.entity';
import {
  createMockUser,
  mockUser,
  mockUser2,
} from '../../../users/entities/user.entity.mock';
import { User } from '../../../users/entities/user.entity';
import { HttpModule } from '@nestjs/axios';

describe('ChannelUserService', () => {
  let channelUserResolver: ChannelUserResolver;
  let channelResolver: ChannelResolver;
  let channelUserService: ChannelUserService;
  let usersService: UsersService;
  let mockRepoChannel: MockRepo;
  let mockRepoChannelUser: MockRepo;
  let mockRepoUser: MockRepo;

  beforeEach(async () => {
    mockRepoChannel = new MockRepo('ChannelUserResolver', Channel);
    mockRepoChannelUser = new MockRepo('ChannelUserResolver', ChannelUser);
    mockRepoUser = new MockRepo('ChannelUserResolver', User, [
      mockUser,
      mockUser2,
      createMockUser(),
    ]);
    await mockRepoChannel.setupDb();
    await mockRepoChannelUser.setupDb();
    await mockRepoUser.setupDb();

    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        ConfigService,
        ChannelUserResolver,
        ChannelUserService,
        ChannelService,
        UsersService,
        PrcGateway,
        ChannelResolver,
        mockRepoChannel.getProvider(),
        mockRepoChannelUser.getProvider(),
        mockRepoUser.getProvider(),
      ],
    }).compile();

    channelUserResolver = module.get<ChannelUserResolver>(ChannelUserResolver);
    channelResolver = module.get<ChannelResolver>(ChannelResolver);
    channelUserService = module.get<ChannelUserService>(ChannelUserService);
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(async () => {
    await mockRepoChannelUser.clearRepo();
    await mockRepoChannel.clearRepo();
    await mockRepoUser.clearRepo();
  });

  afterAll(async () => {
    await mockRepoChannel.destroyRepo();
    await mockRepoUser.destroyRepo();
    await mockRepoChannelUser.destroyRepo();
  });

  it('should be defined', () => {
    expect(channelUserService).toBeDefined();
    expect(channelUserResolver).toBeDefined();
    expect(channelResolver).toBeDefined();
    expect(usersService).toBeDefined();
  });
});
