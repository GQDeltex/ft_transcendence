import { TestingModule, Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { Intra42Controller } from './intra42.controller';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/entities/user.entity';
import { mockUser } from '../../users/entities/user.entity.mock';
import { MockRepo } from '../../tools/memdb.mock';
import { ConfigService } from '@nestjs/config';
import { Channel } from '../../prc/channel/entities/channel.entity';
import { PrcGateway } from '../../prc/prc.gateway';
import { ChannelService } from '../../prc/channel/channel.service';
import { ChannelUser } from '../../prc/channel/channel-user/entities/channel-user.entity';

describe('Intra42Controller', () => {
  let controller: Intra42Controller;
  let mockRepoUser: MockRepo;
  let mockRepoChannel: MockRepo;
  let mockRepoChannelUser: MockRepo;

  beforeEach(async () => {
    mockRepoUser = new MockRepo('Intra42Controller', User, mockUser);
    mockRepoChannel = new MockRepo('Intra42Controller', Channel);
    mockRepoChannelUser = new MockRepo('Intra42Controller', ChannelUser);
    await mockRepoUser.setupDb();
    await mockRepoChannel.setupDb();
    await mockRepoChannelUser.setupDb();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [Intra42Controller],
      providers: [
        JwtService,
        UsersService,
        ConfigService,
        PrcGateway,
        ChannelService,
        mockRepoUser.getProvider(),
        mockRepoChannel.getProvider(),
        mockRepoChannelUser.getProvider(),
      ],
    }).compile();

    controller = module.get<Intra42Controller>(Intra42Controller);
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
    expect(controller).toBeDefined();
  });
});
