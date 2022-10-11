import { TestingModule, Test } from '@nestjs/testing';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { memdbMock, testUser } from './memdb.mock';
import { DataSource, Repository, QueryFailedError } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let db: DataSource;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    db = await memdbMock(User);
    usersRepository = db.getRepository(User);
    await usersRepository.insert(testUser);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: usersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(async () => await db.destroy());

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
    await expect(service.findOne(98989)).resolves.toEqual(null);
  });

  it('should find user by username', async () => {
    await expect(service.findOne('name')).resolves.toEqual(testUser);
  });

  it('should not find non-existing username', async () => {
    await expect(service.findOne('nonexisting')).resolves.toEqual(null);
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
      QueryFailedError,
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
      QueryFailedError,
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
      QueryFailedError,
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
      QueryFailedError,
    );
  });
});
