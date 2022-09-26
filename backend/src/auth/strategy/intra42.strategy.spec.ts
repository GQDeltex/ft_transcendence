import { Test, TestingModule } from '@nestjs/testing';
import { Intra42Strategy } from './intra42.strategy';

describe('Intra42Service', () => {
  let service: Intra42Strategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Intra42Strategy],
    }).compile();

    service = module.get<Intra42Strategy>(Intra42Strategy);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
