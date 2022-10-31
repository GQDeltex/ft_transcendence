import { Test, TestingModule } from '@nestjs/testing';
import { TwoFAService } from './twoFA.service';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';
import { User } from '../../users/entities/user.entity';
import { mockUser } from '../../users/entities/user.entity.mock';
import { MockRepo } from '../../tools/memdb.mock';
import { Channel } from '../../prc/channel/entities/channel.entity';
import { PrcGateway } from '../../prc/prc.gateway';
import { ChannelService } from '../../prc/channel/channel.service';
import { ChannelUser } from '../../prc/channel/channel-user/entities/channel-user.entity';
import { HttpModule } from '@nestjs/axios';
import { ChannelUserService } from 'src/prc/channel/channel-user/channel-user.service';
import { ChannelUserResolver } from 'src/prc/channel/channel-user/channel-user.resolver';

describe('TwoFAService', () => {
  let service: TwoFAService;
  let mockRepoUser: MockRepo;
  let mockRepoChannel: MockRepo;
  let mockRepoChannelUser: MockRepo;

  beforeEach(async () => {
    mockRepoUser = new MockRepo('TwoFAService', User, mockUser);
    mockRepoChannel = new MockRepo('TwoFAService', Channel);
    mockRepoChannelUser = new MockRepo('TwoFAService', ChannelUser);
    await mockRepoUser.setupDb();
    await mockRepoChannel.setupDb();
    await mockRepoChannelUser.setupDb();

    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        TwoFAService,
        UsersService,
        ConfigService,
        PrcGateway,
        ChannelUserService,
        ChannelUserResolver,
        ChannelService,
        mockRepoUser.getProvider(),
        mockRepoChannel.getProvider(),
        mockRepoChannelUser.getProvider(),
      ],
    }).compile();

    service = module.get<TwoFAService>(TwoFAService);
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
    expect(service).toBeDefined();
  });
});
