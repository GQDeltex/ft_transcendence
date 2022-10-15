import { Test, TestingModule } from '@nestjs/testing';
import { TwoFAService } from './twoFA.service';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';
import { User } from '../../users/entities/user.entity';
import { mockUser } from '../../users/entities/user.entity.mock';
import { MockRepo } from '../../tools/memdb.mock';

describe('TwoFAService', () => {
  let service: TwoFAService;
  let mockRepo: MockRepo;

  beforeEach(async () => {
    mockRepo = new MockRepo('TwoFAService', User, mockUser);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TwoFAService,
        UsersService,
        ConfigService,
        mockRepo.getProvider(),
      ],
    }).compile();

    service = module.get<TwoFAService>(TwoFAService);
  });

  afterAll(async () => await mockRepo.destroyRepo());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
