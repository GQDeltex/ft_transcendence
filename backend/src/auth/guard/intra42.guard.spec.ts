import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Intra42OAuthGuard } from './intra42.guard';

describe('Intra42Guard', () => {
  let guard: Intra42OAuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Intra42OAuthGuard, ConfigService],
    }).compile();

    guard = module.get<Intra42OAuthGuard>(Intra42OAuthGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
