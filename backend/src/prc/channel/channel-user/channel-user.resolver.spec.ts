import { Test, TestingModule } from '@nestjs/testing';
import { ChannelUserResolver } from './channel-user.resolver';
import { ChannelService } from '../channel.service';
import { Channel } from '../entities/channel.entity';
import { ChannelUser } from './entities/channel-user.entity';
import { MockRepo } from '../../../tools/memdb.mock';
import { ConfigService } from '@nestjs/config';
import { User } from '../../../users/entities/user.entity';
import { UsersService } from '../../../users/users.service';
import {
  createMockUser,
  mockUser,
  mockUser2,
} from '../../../users/entities/user.entity.mock';
import { ChannelUserService } from './channel-user.service';
import { PrcGateway } from '../../prc.gateway';
import { JwtPayload } from '../../../auth/strategy/jwt.strategy';
import { WsException } from '@nestjs/websockets';
import { ChannelResolver } from '../channel.resolver';
import { HttpModule } from '@nestjs/axios';

describe('ChannelUserResolver', () => {
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

  //DEFINE
  it('should be defined', () => {
    expect(channelUserResolver).toBeDefined();
  });

  /*****ADMIN*****/
  it('should not update admin because oldAdmin not on channel', async () => {
    const oldAdmin: JwtPayload = {
      id: mockUser.id,
      email: mockUser.email,
      isAuthenticated: true,
    };
    await expect(
      channelUserResolver.updateAdmin(oldAdmin, '#test', mockUser2.id),
    ).rejects.toThrow(WsException);
  });

  it('should not update admin because newAdmin not on channel', async () => {
    const oldAdmin: JwtPayload = {
      id: mockUser.id,
      email: mockUser.email,
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

  it('should not update admin because oldAdmin is not an admin on channel', async () => {
    const oldAdmin: JwtPayload = {
      id: mockUser.id,
      email: mockUser.email,
      isAuthenticated: true,
    };
    const newAdmin: User = mockUser2;
    await expect(
      channelResolver.joinChannel({ name: '#test', password: '' }, newAdmin),
    ).resolves.not.toThrow();
    await expect(
      channelResolver.joinChannel({ name: '#test', password: '' }, mockUser),
    ).resolves.not.toThrow();
    await expect(
      channelUserResolver.updateAdmin(oldAdmin, '#test', newAdmin.id),
    ).rejects.toThrow(`${oldAdmin.id} is not a Channel Admin on #test`);
  });

  it('should update newAdmin to admin', async () => {
    const oldAdmin: JwtPayload = {
      id: mockUser.id,
      email: mockUser.email,
      isAuthenticated: true,
    };
    const newAdmin: User = mockUser2;
    await expect(
      channelResolver.joinChannel({ name: '#test', password: '' }, mockUser),
    ).resolves.not.toThrow();
    await expect(
      channelResolver.joinChannel({ name: '#test', password: '' }, newAdmin),
    ).resolves.not.toThrow();
    await expect(
      channelUserResolver.updateAdmin(oldAdmin, '#test', newAdmin.id),
    ).resolves.not.toThrow();
  });
  /******ADMIN*******/

  /*****PASSWORD*****/
  it('should not change password because user not on channel', async () => {
    const JwtUser: JwtPayload = {
      id: mockUser.id,
      email: mockUser.email,
      isAuthenticated: true,
    };
    const name = '#test';
    await expect(
      channelUserResolver.updatePassword(JwtUser, name, 'new'),
    ).rejects.toThrow(JwtUser.id + ' not in ' + name);
  });

  it('should not update password because user not channel owner', async () => {
    const JwtUser: JwtPayload = {
      id: mockUser.id,
      email: mockUser.email,
      isAuthenticated: true,
    };
    const name = '#test';
    await expect(
      channelResolver.joinChannel({ name: name, password: '' }, mockUser2),
    ).resolves.not.toThrow();
    await expect(
      channelResolver.joinChannel({ name: name, password: '' }, mockUser),
    ).resolves.not.toThrow();
    await expect(
      channelUserResolver.updatePassword(JwtUser, name, 'new'),
    ).rejects.toThrow('Not Channel Owner');
  });

  it('should update password', async () => {
    const JwtUser: JwtPayload = {
      id: mockUser.id,
      email: mockUser.email,
      isAuthenticated: true,
    };
    const name = '#test';
    await expect(
      channelResolver.joinChannel({ name: name, password: '' }, mockUser),
    ).resolves.not.toThrow();
    await expect(
      channelUserResolver.updatePassword(JwtUser, name, 'new'),
    ).resolves.toEqual(expect.any(Channel));
  });
  /*****PASSWORD*****/

  /*******BAN********/
  it('should not ban user because admin is not on channel', async () => {
    const admin: JwtPayload = {
      id: mockUser.id,
      email: mockUser.email,
      isAuthenticated: true,
    };
    await expect(
      channelUserResolver.updateBan(admin, '#test', mockUser2.id),
    ).rejects.toThrow(WsException);
  });

  it('should not ban user because user to be banned is not on channel', async () => {
    const admin: JwtPayload = {
      id: mockUser.id,
      email: mockUser.email,
      isAuthenticated: true,
    };
    const banUser: User = mockUser2;
    await expect(
      channelResolver.joinChannel({ name: '#test', password: '' }, mockUser),
    ).resolves.not.toThrow();
    await expect(
      channelUserResolver.updateBan(admin, '#test', banUser.id),
    ).rejects.toThrow(banUser.id + ' not in #test');
  });

  it('should not ban user because admin is not an admin on channel', async () => {
    const admin: JwtPayload = {
      id: mockUser.id,
      email: mockUser.email,
      isAuthenticated: true,
    };
    const banUser: User = mockUser2;
    await expect(
      channelResolver.joinChannel({ name: '#test', password: '' }, banUser),
    ).resolves.not.toThrow();
    await expect(
      channelResolver.joinChannel({ name: '#test', password: '' }, mockUser),
    ).resolves.not.toThrow();
    await expect(
      channelUserResolver.updateBan(admin, '#test', banUser.id),
    ).rejects.toThrow(`${admin.id} is not a Channel Admin on #test`);
  });

  it('should not ban themself', async () => {
    const selfJwt: JwtPayload = {
      id: mockUser.id,
      email: mockUser.email,
      isAuthenticated: true,
    };
    await expect(
      channelResolver.joinChannel({ name: '#test', password: '' }, mockUser),
    ).resolves.not.toThrow();
    await expect(
      channelUserResolver.updateBan(selfJwt, '#test', selfJwt.id),
    ).rejects.toThrow(`${mockUser.id} cannot ban themself`);
  });

  it('should not ban owner', async () => {
    const owner: User = mockUser;
    const ownerJwt: JwtPayload = {
      id: mockUser.id,
      email: mockUser.email,
      isAuthenticated: true,
    };
    const admin: User = mockUser2;
    const adminJwt: JwtPayload = {
      id: mockUser2.id,
      email: mockUser2.email,
      isAuthenticated: true,
    };
    await expect(
      channelResolver.joinChannel({ name: '#test', password: '' }, owner),
    ).resolves.not.toThrow();
    await expect(
      channelResolver.joinChannel({ name: '#test', password: '' }, admin),
    ).resolves.not.toThrow();
    await expect(
      channelUserResolver.updateAdmin(ownerJwt, '#test', admin.id),
    ).resolves.not.toThrow();
    await expect(
      channelUserResolver.updateBan(adminJwt, '#test', owner.id),
    ).rejects.toThrow(`${admin.id} does not have permision to ban an owner`);
  });

  it('should not ban admin if not owner', async () => {
    const owner: User = mockUser;
    const ownerJwt: JwtPayload = {
      id: mockUser.id,
      email: mockUser.email,
      isAuthenticated: true,
    };
    const admin: User = mockUser2;
    const adminJwt: JwtPayload = {
      id: mockUser2.id,
      email: mockUser2.email,
      isAuthenticated: true,
    };
    const admin2: User = createMockUser();
    await expect(
      channelResolver.joinChannel({ name: '#test', password: '' }, owner),
    ).resolves.not.toThrow();
    await expect(
      channelResolver.joinChannel({ name: '#test', password: '' }, admin),
    ).resolves.not.toThrow();
    await expect(
      channelResolver.joinChannel({ name: '#test', password: '' }, admin2),
    ).resolves.not.toThrow();
    await expect(
      channelUserResolver.updateAdmin(ownerJwt, '#test', admin.id),
    ).resolves.not.toThrow();
    await expect(
      channelUserResolver.updateAdmin(ownerJwt, '#test', admin2.id),
    ).resolves.not.toThrow();
    await expect(
      channelUserResolver.updateBan(adminJwt, '#test', admin2.id),
    ).rejects.toThrow(`${admin.id} does not have permision to ban an admin`);
  });

  it('should ban user', async () => {
    jest.useFakeTimers({ legacyFakeTimers: true });
    const admin: JwtPayload = {
      id: mockUser.id,
      email: mockUser.email,
      isAuthenticated: true,
    };
    const banUser: User = mockUser2;
    await expect(
      channelResolver.joinChannel({ name: '#test', password: '' }, mockUser),
    ).resolves.not.toThrow();
    await expect(
      channelResolver.joinChannel({ name: '#test', password: '' }, banUser),
    ).resolves.not.toThrow();
    const channelUserNew: ChannelUser = await usersService.findChannelUser(
      banUser.id,
      '#test',
    );
    await expect(
      channelUserResolver.updateBan(admin, '#test', banUser.id),
    ).resolves.not.toThrow();
    jest.clearAllTimers();
    await expect(
      channelUserResolver.updateBan(admin, '#test', banUser.id),
    ).rejects.toThrow(`${banUser.id} is already banned on #test`);
    await expect(
      channelUserService.unban(channelUserNew.id),
    ).resolves.not.toThrow();
    jest.useRealTimers();
  });
  /*******BAN**********/

  /*******MUTE*********/
  it('should not mute user because admin is not on channel', async () => {
    const admin: JwtPayload = {
      id: mockUser.id,
      email: mockUser.email,
      isAuthenticated: true,
    };
    await expect(
      channelUserResolver.updateMute(admin, '#test', mockUser2.id),
    ).rejects.toThrow(WsException);
  });

  it('should not mute user because user to be muted is not on channel', async () => {
    const admin: JwtPayload = {
      id: mockUser.id,
      email: mockUser.email,
      isAuthenticated: true,
    };
    const muteUser: User = mockUser2;
    await expect(
      channelResolver.joinChannel({ name: '#test', password: '' }, mockUser),
    ).resolves.not.toThrow();
    await expect(
      channelUserResolver.updateMute(admin, '#test', muteUser.id),
    ).rejects.toThrow(muteUser.id + ' not in #test');
  });

  it('should not mute user because admin is not an admin on channel', async () => {
    const admin: JwtPayload = {
      id: mockUser.id,
      email: mockUser.email,
      isAuthenticated: true,
    };
    const muteUser: User = mockUser2;
    await expect(
      channelResolver.joinChannel({ name: '#test', password: '' }, muteUser),
    ).resolves.not.toThrow();
    await expect(
      channelResolver.joinChannel({ name: '#test', password: '' }, mockUser),
    ).resolves.not.toThrow();
    await expect(
      channelUserResolver.updateMute(admin, '#test', muteUser.id),
    ).rejects.toThrow(`${admin.id} is not a Channel Admin on #test`);
  });

  it('should not mute itself', async () => {
    const itself: JwtPayload = {
      id: mockUser.id,
      email: mockUser.email,
      isAuthenticated: true,
    };
    await expect(
      channelResolver.joinChannel({ name: '#test', password: '' }, mockUser),
    ).resolves.not.toThrow();
    await expect(
      channelUserResolver.updateMute(itself, '#test', itself.id),
    ).rejects.toThrow(`${mockUser.id} cannot mute itself`);
  });

  it('should not mute owner because he does not have permission', async () => {
    const admin: JwtPayload = {
      id: mockUser.id,
      email: mockUser.email,
      isAuthenticated: true,
    };
    const owner: User = mockUser2;
    await expect(
      channelResolver.joinChannel({ name: '#test', password: '' }, owner),
    ).resolves.not.toThrow();
    await expect(
      channelResolver.joinChannel({ name: '#test', password: '' }, mockUser),
    ).resolves.not.toThrow();
    const ownerJWT: JwtPayload = {
      id: mockUser2.id,
      email: mockUser2.email,
      isAuthenticated: true,
    };
    await expect(
      channelUserResolver.updateAdmin(ownerJWT, '#test', mockUser.id),
    ).resolves.not.toThrow();
    await expect(
      channelUserResolver.updateMute(admin, '#test', owner.id),
    ).rejects.toThrow(`${admin.id} does not have permision to mute an owner`);
  });

  it('should not mute admin because he does not have permission', async () => {
    const admin1Jwt: JwtPayload = {
      id: mockUser.id,
      email: mockUser.email,
      isAuthenticated: true,
    };
    const admin2: User = createMockUser();
    const owner: User = mockUser2;
    await expect(
      channelResolver.joinChannel({ name: '#test', password: '' }, owner),
    ).resolves.not.toThrow();
    await expect(
      channelResolver.joinChannel({ name: '#test', password: '' }, mockUser),
    ).resolves.not.toThrow();
    await expect(
      channelResolver.joinChannel({ name: '#test', password: '' }, admin2),
    ).resolves.not.toThrow();
    const ownerJWT: JwtPayload = {
      id: mockUser2.id,
      email: mockUser2.email,
      isAuthenticated: true,
    };
    await expect(
      channelUserResolver.updateAdmin(ownerJWT, '#test', mockUser.id),
    ).resolves.not.toThrow();
    await expect(
      channelUserResolver.updateAdmin(ownerJWT, '#test', admin2.id),
    ).resolves.not.toThrow();
    await expect(
      channelUserResolver.updateMute(admin1Jwt, '#test', admin2.id),
    ).rejects.toThrow(
      `${admin1Jwt.id} does not have permision to mute an admin`,
    );
  });

  it('should mute user', async () => {
    jest.useFakeTimers({ legacyFakeTimers: true });
    const admin: JwtPayload = {
      id: mockUser.id,
      email: mockUser.email,
      isAuthenticated: true,
    };
    const muteUser: User = mockUser2;
    await expect(
      channelResolver.joinChannel({ name: '#test', password: '' }, mockUser),
    ).resolves.not.toThrow();
    await expect(
      channelResolver.joinChannel({ name: '#test', password: '' }, muteUser),
    ).resolves.not.toThrow();
    const channelUserNew: ChannelUser = await usersService.findChannelUser(
      muteUser.id,
      '#test',
    );
    await expect(
      channelUserResolver.updateMute(admin, '#test', muteUser.id),
    ).resolves.not.toThrow();
    jest.clearAllTimers();
    await expect(
      channelUserResolver.updateMute(admin, '#test', muteUser.id),
    ).rejects.toThrow(`${muteUser.id} is already muted on #test`);
    await expect(
      channelUserService.unmute(channelUserNew.id),
    ).resolves.not.toThrow();
    jest.useRealTimers();
  });
  /*****MUTE*****/
});
