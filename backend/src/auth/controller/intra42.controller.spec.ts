import { TestingModule, Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { Intra42Controller } from './intra42.controller';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/entities/user.entity';
import { mockUser } from '../../users/entities/user.entity.mock';
import { MockRepo } from '../../tools/memdb.mock';
import { ConfigService } from '@nestjs/config';

describe('Intra42Controller', () => {
  let controller: Intra42Controller;
  let mockRepo: MockRepo;

  beforeEach(async () => {
    mockRepo = new MockRepo('Intra42Controller', User, mockUser);
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Intra42Controller],
      providers: [
        JwtService,
        UsersService,
        ConfigService,
        mockRepo.getProvider(),
      ],
    }).compile();

    controller = module.get<Intra42Controller>(Intra42Controller);
  });

  afterAll(async () => await mockRepo.destroyRepo());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
