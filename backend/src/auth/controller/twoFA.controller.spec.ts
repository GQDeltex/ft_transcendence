import { Test, TestingModule } from '@nestjs/testing';
import { TwoFAService } from '../service/twoFA.service';
import { TwoFAController } from './twoFA.controller';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/entities/user.entity';
import { mockUser } from '../../users/entities/user.entity.mock';
import { MockRepo } from '../../tools/memdb.mock';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Channel } from '../../prc/channel/entities/channel.entity';
import { PrcGateway } from '../../prc/prc.gateway';
import { ChannelService } from '../../prc/channel/channel.service';
import { ChannelUser } from '../../prc/channel/channel-user/entities/channel-user.entity';
import { HttpModule } from '@nestjs/axios';
import { ChannelUserService } from '../../prc/channel/channel-user/channel-user.service';
import { ChannelUserResolver } from '../../prc/channel/channel-user/channel-user.resolver';

describe('TwoFAController', () => {
  let controller: TwoFAController;
  let mockRepoUser: MockRepo;
  let mockRepoChannel: MockRepo;
  let mockRepoChannelUser: MockRepo;

  beforeEach(async () => {
    mockRepoUser = new MockRepo('TwoFAController', User, mockUser);
    mockRepoChannel = new MockRepo('TwoFAController', Channel);
    mockRepoChannelUser = new MockRepo('TwoFAController', ChannelUser);
    await mockRepoUser.setupDb();
    await mockRepoChannel.setupDb();
    await mockRepoChannelUser.setupDb();

    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [TwoFAController],
      providers: [
        TwoFAService,
        UsersService,
        JwtService,
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

    controller = module.get<TwoFAController>(TwoFAController);
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
