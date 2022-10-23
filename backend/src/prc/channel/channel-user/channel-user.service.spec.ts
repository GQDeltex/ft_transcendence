import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MockRepo } from '../../../tools/memdb.mock';
import { ChannelUserService } from './channel-user.service';
import { ChannelUser } from './entities/channeluser.entity';

describe('ChannelUserService', () => {
  let service: ChannelUserService;
  let mockRepoChannelUser: MockRepo;

  beforeEach(async () => {
    mockRepoChannelUser = new MockRepo('ChannelService', ChannelUser);
    await mockRepoChannelUser.setupDb();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        ChannelUserService,
        mockRepoChannelUser.getProvider()
      ],
    }).compile();

    service = module.get<ChannelUserService>(ChannelUserService);
  });

  afterEach(async () => {
    await mockRepoChannelUser.clearRepo();
  });
  afterAll(async () => {
    await mockRepoChannelUser.destroyRepo();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
