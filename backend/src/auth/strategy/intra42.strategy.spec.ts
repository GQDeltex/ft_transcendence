import { Test, TestingModule } from '@nestjs/testing';
import { Intra42Strategy } from './intra42.strategy';
import { ConfigService } from '@nestjs/config';

describe('Intra42Strategy', () => {
  let service: Intra42Strategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Intra42Strategy, ConfigService],
    }).compile();

    service = module.get<Intra42Strategy>(Intra42Strategy);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
