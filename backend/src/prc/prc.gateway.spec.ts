import { Test, TestingModule } from '@nestjs/testing';
import { PrcGateway } from './prc.gateway';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { mockUser } from '../users/entities/user.entity.mock';
import { MockRepo } from '../tools/memdb.mock';
import { ConfigService } from '@nestjs/config';

describe('PrcGateway', () => {
  let gateway: PrcGateway;
  let mockRepo: MockRepo;

  beforeEach(async () => {
    mockRepo = new MockRepo('PrcGateway', User, mockUser);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        PrcGateway,
        UsersService,
        mockRepo.getProvider(),
      ],
    }).compile();

    gateway = module.get<PrcGateway>(PrcGateway);
  });

  afterEach(async () => await mockRepo.clearRepo());
  afterAll(async () => await mockRepo.destroyRepo());

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
