import { Test, TestingModule } from '@nestjs/testing';
import { PrcGateway } from './prc.gateway';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { getMockRepoProvider, testUser } from '../users/memdb.mock';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

describe('PrcGateway', () => {
  let gateway: PrcGateway;
  let mockRepo: Repository<User>;

  beforeEach(async () => {
    const mockRepoProvider = await getMockRepoProvider('PrcGateway', User, [
      testUser,
    ]);
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, PrcGateway, UsersService, mockRepoProvider],
    }).compile();

    gateway = module.get<PrcGateway>(PrcGateway);
    mockRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(async () => mockRepo.manager.connection.close());

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
