import { Test, TestingModule } from '@nestjs/testing';
import { TwoFAService } from '../service/twoFA.service';
import { TwoFAController } from './twoFA.controller';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/entities/user.entity';
import { mockUser } from '../../users/entities/user.entity.mock';
import { MockRepo } from '../../tools/memdb.mock';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

describe('TwoFAController', () => {
  let controller: TwoFAController;
  let mockRepo: MockRepo;

  beforeEach(async () => {
    mockRepo = new MockRepo('TwoFAController', User, mockUser);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TwoFAController],
      providers: [
        TwoFAService,
        UsersService,
        JwtService,
        ConfigService,
        mockRepo.getProvider(),
      ],
    }).compile();

    controller = module.get<TwoFAController>(TwoFAController);
  });

  afterEach(async () => await mockRepo.clearRepo());
  afterAll(async () => await mockRepo.destroyRepo());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
