import { TestingModule, Test } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Repository, DataSource } from 'typeorm';
import { memdbMock, testUser } from './memdb.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let db: DataSource;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    db = await memdbMock(User);
    usersRepository = db.getRepository(User);
    await usersRepository.insert(testUser);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: usersRepository,
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  afterEach(async () => await db.destroy());

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
