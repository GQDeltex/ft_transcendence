import { UserPipe } from './user-pipe.service';
import { MockRepo } from '../../tools/memdb.mock';
import { User } from '../entities/user.entity';
import { mockUser } from '../entities/user.entity.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';

describe('UserPipe', () => {
  let pipe: UserPipe;
  let mockRepo: MockRepo;

  beforeEach(async () => {
    mockRepo = new MockRepo('UsersService', User, mockUser);

    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPipe, UsersService, mockRepo.getProvider()],
    }).compile();

    pipe = module.get<UserPipe>(UserPipe);
  });

  afterEach(async () => await mockRepo.clearRepo());
  afterAll(async () => await mockRepo.destroyRepo());

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });
});
