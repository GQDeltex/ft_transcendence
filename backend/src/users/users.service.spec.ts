import { TestingModule, Test } from '@nestjs/testing';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { getMockRepoProvider, testUser } from './memdb.mock';
import { QueryFailedError, EntityNotFoundError, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';

describe('UsersService', () => {
  let service: UsersService;
  let mockRepo: Repository<User>;

  beforeEach(async () => {
    const mockRepoProvider = await getMockRepoProvider(User, [testUser]);
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [ConfigService, mockRepoProvider, UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    mockRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  // Somehow this doesn't work, even though dataSource is the newer one...
  //afterEach(async () => mockRepo.manager.dataSource.destroy());
  // So using the older connection instead.
  afterEach(async () => mockRepo.manager.connection.close());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all users', async () => {
    await expect(service.findAll()).resolves.toEqual([testUser]);
  });

  it('should find user by id', async () => {
    await expect(service.findOne(84364)).resolves.toEqual(testUser);
  });

  it('should not find non-existing id', async () => {
    await expect(service.findOne(98989)).rejects.toThrow(EntityNotFoundError);
  });

  it('should find user by username', async () => {
    await expect(service.findOne('name')).resolves.toEqual(testUser);
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
    };
    await expect(service.create(newUser)).resolves.not.toThrow();
    await expect(service.findOne(12345)).resolves.toEqual(newUser);
  });

  it('should not create a user if existing', async () => {
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
    };
    await expect(service.create(newerUser)).rejects.toThrow(QueryFailedError);
    await expect(service.findOne(testUser.id)).resolves.toEqual(testUser);
  });

  it('should change the username', async () => {
    const newUser: User = testUser;
    newUser.username = 'test2';
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
    };
    await expect(service.create(newUser)).resolves.not.toThrow();
    await expect(
      service.updateUsername(newUser.id, testUser.username),
    ).rejects.toThrow(QueryFailedError);
    await expect(service.findOne(newUser.id)).resolves.toEqual(newUser);
  });

  it('should change the picture', async () => {
    const newUser: User = testUser;
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
    const newUser: User = testUser;
    newUser.twoFASecret = 'somesecret';
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
    const newUser: User = testUser;
    newUser.twoFAEnable = true;
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
    const newUser: User = testUser;
    newUser.socketId = 'f3ie389hd';
    await expect(
      service.updateSocketId(testUser.id, newUser.socketId),
    ).resolves.not.toThrow();
    await expect(service.findOne(testUser.id)).resolves.toEqual(newUser);
  });
});
