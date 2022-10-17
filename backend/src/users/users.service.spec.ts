import { TestingModule, Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { mockUser } from './entities/user.entity.mock';
import { MockRepo } from '../tools/memdb.mock';
import { QueryFailedError, EntityNotFoundError } from 'typeorm';
import { ConfigService } from '@nestjs/config';

describe('UsersService', () => {
  let service: UsersService;
  let mockRepo: MockRepo;

  beforeEach(async () => {
    mockRepo = new MockRepo('UsersService', User, mockUser);

    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, mockRepo.getProvider(), UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(async () => await mockRepo.clearRepo());
  afterAll(async () => await mockRepo.destroyRepo());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all users', async () => {
    await expect(service.findAll()).resolves.toEqual([
      mockRepo.getTestEntity(),
    ]);
  });

  it('should find user by id', async () => {
    await expect(service.findOne(84364)).resolves.toEqual(
      mockRepo.getTestEntity(),
    );
  });

  it('should not find non-existing id', async () => {
    await expect(service.findOne(98989)).rejects.toThrow(EntityNotFoundError);
  });

  it('should find user by username', async () => {
    await expect(service.findOne('name')).resolves.toEqual(
      mockRepo.getTestEntity(),
    );
  });

  it('should not find non-existing username', async () => {
    await expect(service.findOne('nonexisting')).rejects.toThrow(
      EntityNotFoundError,
    );
  });

  it('should create a new user', async () => {
    const newUser: User = {
      id: 12345,
      username: 'test',
      picture: 'http://example.com',
      firstname: 'test',
      lastname: 'person',
      email: 'test@example.com',
      country: 'Germany',
      campus: 'Berlin',
      twoFASecret: null,
      twoFAEnable: false,
      socketId: '',
      title: [''],
      status: 'offline',
      channelList: [],
    };
    await expect(service.create(newUser)).resolves.not.toThrow();
    await expect(service.findOne(12345)).resolves.toEqual(newUser);
  });

  it('should not create a user if existing', async () => {
    const testUser = mockRepo.getTestEntity();
    const newerUser: User = {
      id: testUser.id,
      username: 'nanu',
      picture: 'http://example.com',
      firstname: 'foo',
      lastname: 'bar',
      email: 'test@example.com',
      country: 'Dreamland',
      campus: 'Shipwreckia',
      twoFASecret: null,
      twoFAEnable: false,
      socketId: '',
      title: [''],
      status: 'offline',
      channelList: [],
    };
    await expect(service.create(newerUser)).rejects.toThrow(QueryFailedError);
    await expect(service.findOne(testUser.id)).resolves.toEqual(testUser);
  });

  it('should change the username', async () => {
    const newUser: User = mockRepo.getTestEntity({ username: 'test2' });
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
    const newUser: User = {
      id: 12345,
      username: 'test',
      picture: 'http://example.com',
      firstname: 'test',
      lastname: 'person',
      email: 'test@example.com',
      country: 'Germany',
      campus: 'Berlin',
      twoFASecret: null,
      twoFAEnable: false,
      socketId: '',
      title: [''],
      status: 'offline',
      channelList: [],
    };
    await expect(service.create(newUser)).resolves.not.toThrow();
    await expect(
      service.updateUsername(newUser.id, mockRepo.getTestEntity().username),
    ).rejects.toThrow(QueryFailedError);
    await expect(service.findOne(newUser.id)).resolves.toEqual(newUser);
  });

  it('should change the picture', async () => {
    const newUser: User = mockRepo.getTestEntity();
    newUser.picture = 'http://whoknows.com';
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
    const newUser: User = mockRepo.getTestEntity({
      twoFASecret: 'somesecret',
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
    const newUser: User = mockRepo.getTestEntity({ twoFAEnable: true });
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
    const newUser: User = mockRepo.getTestEntity({ socketId: 'f3ie389hd' });
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
    const testUser: User = mockRepo.getTestEntity();
    const newUser: User = mockRepo.getTestEntity({ socketId: 'f3ie389hd' });
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
    const newUser: User = mockRepo.getTestEntity({ status: 'online' });
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
    const newUser: User = mockRepo.getTestEntity({ status: 'online' });
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
