import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { TwoFAService } from '../service/twoFA.service';
import { TwoFAController } from './twoFA.controller';
import { User } from '../../users/entities/user.entity';
import { getMockRepoProvider, testUser } from '../../users/memdb.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';

describe('TwoFAController', () => {
  let controller: TwoFAController;
  let mockRepo: Repository<User>;

  beforeEach(async () => {
    const mockRepoProvider = await getMockRepoProvider(
      'TwoFAController',
      User,
      [testUser],
    );
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TwoFAController],
      providers: [TwoFAService, UsersService, ConfigService, mockRepoProvider],
    }).compile();

    controller = module.get<TwoFAController>(TwoFAController);
    mockRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(async () => mockRepo.manager.connection.close());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
