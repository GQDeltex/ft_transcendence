import { Test, TestingModule } from '@nestjs/testing';
import { TwoFAService } from './twoFA.service';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';
import { User } from '../../users/entities/user.entity';
import { getMockRepoProvider, testUser } from '../../users/memdb.mock';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TwoFAService', () => {
  let service: TwoFAService;
  let mockRepo: Repository<User>;

  beforeEach(async () => {
    const mockRepoProvider = await getMockRepoProvider('TwoFAService', User, [
      testUser,
    ]);
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwoFAService, UsersService, ConfigService, mockRepoProvider],
    }).compile();

    service = module.get<TwoFAService>(TwoFAService);
    mockRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(async () => mockRepo.manager.connection.close());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
