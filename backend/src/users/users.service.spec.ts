import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { createMockUser, mockUser } from './entities/user.entity.mock';
import { MockRepo } from '../tools/memdb.mock';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Channel } from '../prc/channel/entities/channel.entity';
import { PrcGateway } from '../prc/prc.gateway';
import { ChannelService } from '../prc/channel/channel.service';
import { ChannelUser } from '../prc/channel/channel-user/entities/channel-user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let mockRepoUser: MockRepo;
  let mockRepoChannel: MockRepo;
  let mockRepoChannelUser: MockRepo;

  beforeEach(async () => {
    mockRepoUser = new MockRepo('UsersService', User, mockUser);
    mockRepoChannel = new MockRepo('UsersService', Channel);
    mockRepoChannelUser = new MockRepo('UsersService', ChannelUser);
    await mockRepoUser.setupDb();
    await mockRepoChannel.setupDb();
    await mockRepoChannelUser.setupDb();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        UsersService,
        PrcGateway,
        ChannelService,
        mockRepoUser.getProvider(),
        mockRepoChannel.getProvider(),
        mockRepoChannelUser.getProvider(),
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
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

  it('should find all users', async () => {
    await expect(service.findAll()).resolves.toEqual([
      mockRepoUser.getTestEntity(),
    ]);
  });

  it('should find user by id', async () => {
    await expect(service.findOne(84364)).resolves.toEqual(
      mockRepoUser.getTestEntity(),
    );
  });

  // Issue #194 https://github.com/GQDeltex/ft_transcendence/issues/194
  it('should not find user with undefined', async () => {
    await expect(
      service.findOne(undefined as unknown as string),
    ).rejects.toThrow(EntityNotFoundError);
  });

  it('should not find non-existing id', async () => {
    await expect(service.findOne(98989)).rejects.toThrow(EntityNotFoundError);
  });

  it('should find user by username', async () => {
    await expect(service.findOne('name')).resolves.toEqual(
      mockRepoUser.getTestEntity(),
    );
  });

  it('should not find non-existing username', async () => {
    await expect(service.findOne('nonExisting')).rejects.toThrow(
      EntityNotFoundError,
    );
  });

  it('should create a new user', async () => {
    const newUser: User = createMockUser();
    await expect(service.create(newUser)).resolves.not.toThrow();
    await expect(service.findOne(12345)).resolves.toEqual(newUser);
  });

  it('should not create a user if existing', async () => {
    const testUser = mockRepoUser.getTestEntity();
    const newerUser: User = createMockUser({ id: testUser.id });
    await expect(service.create(newerUser)).rejects.toThrow(QueryFailedError);
    await expect(service.findOne(testUser.id)).resolves.toEqual(testUser);
  });

  it('should change the username', async () => {
    const newUser: User = mockRepoUser.getTestEntity({ username: 'test2' });
    await expect(
      service.updateUsername(newUser.id, newUser.username),
    ).resolves.not.toThrow();
    await expect(service.findOne(newUser.id)).resolves.toEqual(newUser);
  });

  it('should not change the username if not exists', async () => {
    await expect(service.updateUsername(87542, 'nothing')).rejects.toThrow(
      EntityNotFoundError,
    );
  });

  it('should not change the username if not unique', async () => {
    const newUser: User = createMockUser();
    await expect(service.create(newUser)).resolves.not.toThrow();
    await expect(
      service.updateUsername(newUser.id, mockRepoUser.getTestEntity().username),
    ).rejects.toThrow(QueryFailedError);
    await expect(service.findOne(newUser.id)).resolves.toEqual(newUser);
  });

  it('should change the picture', async () => {
    const newUser: User = mockRepoUser.getTestEntity();
    newUser.picture = 'https://whoknows.com';
    await expect(
      service.updatePicture(newUser.id, newUser.picture),
    ).resolves.not.toThrow();
    await expect(service.findOne(newUser.id)).resolves.toEqual(newUser);
  });

  it('should not change the picture if not exists', async () => {
    await expect(service.updatePicture(87542, 'nothing')).rejects.toThrow(
      EntityNotFoundError,
    );
  });

  it('should change the 2FA secret', async () => {
    const newUser: User = mockRepoUser.getTestEntity({
      twoFASecret: 'someSecret',
    });
    if (newUser.twoFASecret == null) throw new Error('2FA Secret is empty');
    await expect(
      service.update2FASecret(newUser.id, newUser.twoFASecret),
    ).resolves.not.toThrow();
    await expect(service.findOne(newUser.id)).resolves.toEqual(newUser);
  });

  it('should not change the 2FA secret if not exists', async () => {
    await expect(service.update2FASecret(87542, 'nothing')).rejects.toThrow(
      EntityNotFoundError,
    );
  });

  it('should change the 2FA enable', async () => {
    const newUser: User = mockRepoUser.getTestEntity({ twoFAEnable: true });
    await expect(
      service.update2FAEnable(newUser.id, newUser.twoFAEnable),
    ).resolves.not.toThrow();
    await expect(service.findOne(newUser.id)).resolves.toEqual(newUser);
  });

  it('should not change the 2FA enable if not exists', async () => {
    await expect(service.update2FAEnable(87542, true)).rejects.toThrow(
      EntityNotFoundError,
    );
  });

  it('should update the socket id', async () => {
    const newUser: User = mockRepoUser.getTestEntity({ socketId: 'f3ie389hd' });
    await expect(
      service.updateSocketId(newUser.id, newUser.socketId),
    ).resolves.not.toThrow();
    await expect(service.findOne(newUser.id)).resolves.toEqual(newUser);
  });

  it('should not change socket id if not exists', async () => {
    await expect(service.updateSocketId(87542, '98hf23')).rejects.toThrow(
      EntityNotFoundError,
    );
  });

  it('should update the socket id via socketId', async () => {
    const testUser: User = mockRepoUser.getTestEntity();
    const newUser: User = mockRepoUser.getTestEntity({ socketId: 'f3ie389hd' });
    await expect(
      service.updateSocketId(testUser.socketId, newUser.socketId),
    ).resolves.not.toThrow();
    await expect(service.findOne(testUser.id)).resolves.toEqual(newUser);
  });

  it('should not change socket id via socketId if not exists', async () => {
    await expect(service.updateSocketId('9gf3jhd', '98hf23')).rejects.toThrow(
      EntityNotFoundError,
    );
  });

  it('should update the status', async () => {
    const newUser: User = mockRepoUser.getTestEntity({ status: 'online' });
    await expect(
      service.updateStatus(newUser.id, newUser.status),
    ).resolves.not.toThrow();
    await expect(service.findOne(newUser.id)).resolves.toEqual(newUser);
  });

  it('should not change status if not exists', async () => {
    await expect(service.updateStatus(87542, 'offline')).rejects.toThrow(
      EntityNotFoundError,
    );
  });

  it('should update the status via socket-id', async () => {
    const newUser: User = mockRepoUser.getTestEntity({ status: 'online' });
    await expect(
      service.updateStatus(newUser.socketId, newUser.status),
    ).resolves.not.toThrow();
    await expect(service.findOne(newUser.id)).resolves.toEqual(newUser);
  });

  it('should not update the status via socket-id if not exists', async () => {
    await expect(service.updateStatus('98zh3f09', 'online')).rejects.toThrow(
      EntityNotFoundError,
    );
  });
});
