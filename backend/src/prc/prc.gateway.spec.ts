import { Test, TestingModule } from '@nestjs/testing';
import { PrcGateway } from './prc.gateway';

describe('PrcGateway', () => {
  let gateway: PrcGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrcGateway],
    }).compile();

    gateway = module.get<PrcGateway>(PrcGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
