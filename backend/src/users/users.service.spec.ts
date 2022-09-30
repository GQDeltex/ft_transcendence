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
    usersRepository.insert(testUser);
    service = new UsersService(usersRepository);
  });

  afterEach(async () => db.close());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all users', async () => {
    expect(service.findAll()).resolves.toEqual([testUser]);
  });

  it('should find user by id', async () => {
    expect(service.findOne(84364)).resolves.toEqual(testUser);
  });

  it('should not find non-existing id', async () => {
    expect(service.findOne(98989)).resolves.toEqual(null);
  });

  it('should find user by username', async () => {
    expect(service.findOne('name')).resolves.toEqual(testUser);
  });

  it('should not find non-existing username', async () => {
    expect(service.findOne('nonexisting')).resolves.toEqual(null);
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
    expect(service.findOne(12345)).resolves.toEqual(newUser);
  });

  it('should update a user if existing', async () => {
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
    expect(service.findOne(12345)).resolves.toEqual(newUser);
    const newerUser: User = {
      id: 12345,
      username: 'nanu',
      picture: 'http://example.com',
      firstname: 'foo',
      lastname: 'bar',
      email: 'test@example.com',
      country: 'Dreamland',
      campus: 'Shipwreckia',
    };
    await service.create(newerUser);
    expect(service.findOne(12345)).resolves.toEqual(newerUser);
  });

  it('should change the username', async () => {
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
    expect(await service.updateUsername(newUser.id, 'test2')).resolves;
    newUser.username = 'test2';
    expect(service.findOne(12345)).resolves.toEqual(newUser);
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
    await expect(service.updateUsername(newUser.id, 'name')).rejects.toThrow(
      QueryFailedError,
    );
    expect(service.findOne(12345)).resolves.toEqual(newUser);
  });

  it('should change the picture', async () => {
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
    expect(await service.updatePicture(newUser.id, 'http://whoknows.com'))
      .resolves;
    newUser.picture = 'http://whoknows.com';
    expect(service.findOne(12345)).resolves.toEqual(newUser);
  });
});
