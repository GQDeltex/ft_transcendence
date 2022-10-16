import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { WsJwtAuthGuard } from './wsJwt.guard';

describe('Intra42Guard', () => {
  let guard: WsJwtAuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WsJwtAuthGuard, ConfigService],
    }).compile();

    guard = module.get<WsJwtAuthGuard>(WsJwtAuthGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
