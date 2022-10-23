import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { mockUser } from './entities/user.entity.mock';
import { MockRepo } from '../tools/memdb.mock';
import { ConfigService } from '@nestjs/config';

describe('UsersController', () => {
  let mockRepo: MockRepo;
  let controller: UsersController;

  beforeEach(async () => {
    mockRepo = new MockRepo('UsersController', User, mockUser);

    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, ConfigService, mockRepo.getProvider()],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterEach(async () => await mockRepo.clearRepo());
  afterAll(async () => await mockRepo.destroyRepo());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
