import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { WsJwt2FAAuthGuard } from './wsJwt.guard';

describe('WsJwt2FAAuthGuard', () => {
  let guard: WsJwt2FAAuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WsJwt2FAAuthGuard, ConfigService],
    }).compile();

    guard = module.get<WsJwt2FAAuthGuard>(WsJwt2FAAuthGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
