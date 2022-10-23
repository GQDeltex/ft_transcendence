import { UserPipe } from './user-pipe.service';
import { MockRepo } from '../../tools/memdb.mock';
import { User } from '../entities/user.entity';
import { mockUser } from '../entities/user.entity.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { Channel } from '../../prc/channel/entities/channel.entity';
import { ChannelUser } from '../../prc/channel/entities/channeluser.entity';
import { PrcGateway } from '../../prc/prc.gateway';
import { ChannelService } from '../../prc/channel/channel.service';

describe('UserPipe', () => {
  let pipe: UserPipe;
  let mockRepoUser: MockRepo;
  let mockRepoChannel: MockRepo;
  let mockRepoChannelUser: MockRepo;

  beforeEach(async () => {
    mockRepoUser = new MockRepo('UserPipe', User, mockUser);
    mockRepoChannel = new MockRepo('UserPipe', Channel);
    mockRepoChannelUser = new MockRepo('UserPipe', ChannelUser);
    await mockRepoUser.setupDb();
    await mockRepoChannel.setupDb();
    await mockRepoChannelUser.setupDb();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPipe,
        UsersService,
        PrcGateway,
        ChannelService,
        mockRepoUser.getProvider(),
        mockRepoChannel.getProvider(),
        mockRepoChannelUser.getProvider(),
      ],
    }).compile();

    pipe = module.get<UserPipe>(UserPipe);
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
    expect(pipe).toBeDefined();
  });
});
