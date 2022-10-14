import { TestingModule, Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { Intra42Controller } from './intra42.controller';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/entities/user.entity';
import { getMockRepoProvider, testUser } from '../../users/memdb.mock';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

describe('Intra42Controller', () => {
  let controller: Intra42Controller;
  let mockRepo: Repository<User>;

  beforeEach(async () => {
    const mockRepoProvider = await getMockRepoProvider(
      'Intra42Controller',
      User,
      [testUser],
    );
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Intra42Controller],
      providers: [JwtService, UsersService, ConfigService, mockRepoProvider],
    }).compile();

    controller = module.get<Intra42Controller>(Intra42Controller);
    mockRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(async () => mockRepo.manager.connection.close());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
