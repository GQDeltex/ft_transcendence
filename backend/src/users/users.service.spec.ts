import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { memdbMock, testUser } from './memdb.mock';
import { CreateUserInput } from './dto/create-user.input';
import { Repository, Connection } from 'typeorm';

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
    expect(await service.findAll()).toEqual([testUser]);
  });
  it('should find user by id', async () => {
    expect(await service.findOne(84364)).toEqual(testUser);
  });
  it('should find user by username', async () => {
    expect(await service.findOne('name')).toEqual(testUser);
  });
  it('should create a new user', async () => {
    const createUserInput: CreateUserInput = {
      id: 12345,
      username: 'test',
      picture: 'http://example.com',
      firstname: 'test',
      lastname: 'person',
      email: 'test@example.com',
      country: 'Germany',
      campus: 'Berlin',
    };
    expect(await service.create(createUserInput));
  });
});
