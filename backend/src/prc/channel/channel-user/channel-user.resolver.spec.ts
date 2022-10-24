import { Test, TestingModule } from '@nestjs/testing';
import { ChannelUserResolver } from './channel-user.resolver';
import { ChannelService } from '../channel.service';
import { Channel } from '../entities/channel.entity';
import { ChannelUser } from './entities/channel-user.entity';
import { MockRepo } from '../../../tools/memdb.mock';
import { ConfigService } from '@nestjs/config';
import { User } from '../../../users/entities/user.entity';
import { UsersService } from '../../../users/users.service';
import { mockUser, mockUser2 } from '../../../users/entities/user.entity.mock';
import { ChannelUserService } from './channel-user.service';
import { PrcGateway } from '../../prc.gateway';
import { JwtPayload } from 'src/auth/strategy/jwt.strategy';
import { WsException } from '@nestjs/websockets';
import { ChannelResolver } from '../channel.resolver';

describe('ChannelUserResolver', () => {
  let channelUserResolver: ChannelUserResolver;
  let channelResolver: ChannelResolver;
  let mockRepoChannel: MockRepo;
  let mockRepoChannelUser: MockRepo;
  let mockRepoUser: MockRepo;

  beforeEach(async () => {
    mockRepoChannel = new MockRepo('ChannelUserResolver', Channel);
    mockRepoChannelUser = new MockRepo('ChannelUserResolver', ChannelUser);
    mockRepoUser = new MockRepo('ChannelUserResolver', User, [
      mockUser,
      mockUser2,
    ]);
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
        ChannelResolver,
        mockRepoChannel.getProvider(),
        mockRepoChannelUser.getProvider(),
        mockRepoUser.getProvider(),
      ],
    }).compile();

    channelUserResolver = module.get<ChannelUserResolver>(ChannelUserResolver);
    channelResolver = module.get<ChannelResolver>(ChannelResolver);
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
    expect(channelUserResolver).toBeDefined();
  });

  it('should not update admin because requester not on channel', async () => {
    const oldAdmin: JwtPayload = {
      username: mockUser.username,
      email: mockUser.email,
      id: mockUser.id,
      isAuthenticated: true,
    };
    const newAdmin: User = mockUser2;
    await expect(
      channelUserResolver.updateAdmin(oldAdmin, '#test', newAdmin.id),
    ).rejects.toThrow(WsException);
  });
  //oldAdmin.username + ' is not a Channel Admin on #test'
  it('should not update admin because newAdmin not on channel', async () => {
    const oldAdmin: JwtPayload = {
      username: mockUser.username,
      email: mockUser.email,
      id: mockUser.id,
      isAuthenticated: true,
    };
    const newAdmin: User = mockUser2;
    await expect(
      channelResolver.joinChannel({ name: '#test', password: '' }, mockUser),
    ).resolves.not.toThrow();
    await expect(
      channelUserResolver.updateAdmin(oldAdmin, '#test', newAdmin.id),
    ).rejects.toThrow(newAdmin.id + ' not in #test');
  });
});
