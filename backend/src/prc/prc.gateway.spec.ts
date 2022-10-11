import { Test, TestingModule } from '@nestjs/testing';
import { PrcGateway } from './prc.gateway';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { memdbMock, testUser } from '../users/memdb.mock';
import { Repository, DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

describe('PrcGateway', () => {
  let gateway: PrcGateway;
  let db: DataSource;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    db = await memdbMock(User);
    usersRepository = db.getRepository(User);
    await usersRepository.insert(testUser);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        PrcGateway,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: usersRepository,
        },
      ],
    }).compile();

    gateway = module.get<PrcGateway>(PrcGateway);
  });

  afterEach(async () => await db.destroy());

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
