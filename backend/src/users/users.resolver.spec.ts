import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Repository, Connection } from 'typeorm';
import { memdbMock, testUser } from './memdb.mock';

describe('UsersResolver', () => {
  let db: Connection;
  let service: UsersService;
  let usersRepository: Repository<User>;
  let resolver: UsersResolver;

  beforeEach(async () => {
    db = await memdbMock(User);
    usersRepository = db.getRepository(User);
    usersRepository.insert(testUser);

    service = new UsersService(usersRepository);
    resolver = new UsersResolver(service);
  });

  afterEach(async () => db.close());

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
