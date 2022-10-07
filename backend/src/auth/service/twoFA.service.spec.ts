import { Test, TestingModule } from '@nestjs/testing';
import { TwoFAService } from './twoFA.service';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';

describe('TwoFAService', () => {
  let service: TwoFAService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwoFAService, UsersService, ConfigService],
    }).compile();

    service = module.get<TwoFAService>(TwoFAService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
