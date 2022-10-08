import { Test, TestingModule } from '@nestjs/testing';
import { TwoFAService } from './twoFA.service';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';
import { User } from '../../users/entities/user.entity';
import { memdbMock, testUser } from '../../users/memdb.mock';
import { Repository, DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TwoFAService', () => {
  let service: TwoFAService;
  let db: DataSource;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    db = await memdbMock(User);
    usersRepository = db.getRepository(User);
    await usersRepository.insert(testUser);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TwoFAService,
        UsersService,
        ConfigService,
        {
          provide: getRepositoryToken(User),
          useValue: usersRepository,
        },
      ],
    }).compile();

    service = module.get<TwoFAService>(TwoFAService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
