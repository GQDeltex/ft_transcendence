import { TestingModule, Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { Intra42Controller } from './intra42.controller';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { memdbMock, testUser } from '../users/memdb.mock';
import { Repository, DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Intra42Controller', () => {
  let controller: Intra42Controller;
  let db: DataSource;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    db = await memdbMock(User);
    usersRepository = db.getRepository(User);
    await usersRepository.insert(testUser);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [Intra42Controller],
      providers: [
        JwtService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: usersRepository,
        },
      ],
    }).compile();

    controller = module.get<Intra42Controller>(Intra42Controller);
  });

  afterEach(async () => await db.destroy());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
