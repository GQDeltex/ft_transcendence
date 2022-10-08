import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, Repository } from 'typeorm';
import { TwoFAService } from '../service/twoFA.service';
import { TwoFAController } from './twoFA.controller';
import { User } from '../../users/entities/user.entity';
import { memdbMock, testUser } from '../../users/memdb.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';

describe('TwoFAController', () => {
  let controller: TwoFAController;
  let db: DataSource;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    db = await memdbMock(User);
    usersRepository = db.getRepository(User);
    await usersRepository.insert(testUser);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TwoFAController],
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

    controller = module.get<TwoFAController>(TwoFAController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
