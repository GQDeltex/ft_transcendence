import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { Intra42Strategy } from './intra42.strategy';

describe('Intra42Service', () => {
  let service: Intra42Strategy;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Intra42Strategy, ConfigService],
    }).compile();

    service = module.get<Intra42Strategy>(Intra42Strategy);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
