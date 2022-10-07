import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { memdbMock, testUser } from './memdb.mock';
import { Repository, Connection, QueryFailedError } from 'typeorm';

describe('UsersService', () => {
  let db: Connection;
  let service: UsersService;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    db = await memdbMock(User);
    usersRepository = db.getRepository(User);
    await usersRepository.insert(testUser);

    service = new UsersService(usersRepository);
  });

  afterEach(async () => db.close());

  it('should be defined', async () => {
    await expect(service).toBeDefined();
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
    };
    await service.create(newUser);
    await expect(service.findOne(12345)).resolves.toEqual(newUser);
  });

  it('should not create a user if existing', async () => {
    const newerUser: User = testUser;
    newerUser.username = 'newerUser'; // Only change username, id is identical
    await expect(service.create(newerUser)).rejects.toThrow(QueryFailedError);
    testUser.username = 'name';
    await expect(service.findOne(testUser.id)).resolves.toEqual(testUser);
  });

  it('should change the username', async () => {
    const newUser: User = testUser;
    newUser.username = 'test2';
    await expect(await service.updateUsername(newUser.id, newUser.username))
      .resolves;
    await expect(service.findOne(newUser.id)).resolves.toEqual(newUser);
  });

  it('should not change the username if not exists', async () => {
    await expect(
      await service.updateUsername(87542, 'nothing'),
    ).rejects.toThrow(QueryFailedError);
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
    };
    await service.create(newUser);
    await expect(service.findAll()).resolves.toEqual([newUser, testUser]);
    await expect(
      service.updateUsername(newUser.id, testUser.username),
    ).rejects.toThrow(QueryFailedError);
    await expect(service.findOne(newUser.id)).resolves.toEqual(newUser);
  });

  it('should change the picture', async () => {
    const newUser: User = testUser;
    newUser.picture = 'http://whoknows.com';
    await expect(await service.updatePicture(newUser.id, newUser.picture))
      .resolves;
    await expect(service.findOne(newUser.id)).resolves.toEqual(newUser);
  });

  it('should not change the picture if not exists', async () => {
    await expect(await service.updatePicture(87542, 'nothing')).rejects.toThrow(
      QueryFailedError,
    );
  });
});
