import { Test, TestingModule } from '@nestjs/testing';
import { TwoFAService } from '../service/twoFA.service';
import { TwoFAController } from './twoFA.controller';

describe('TwoFAController', () => {
  let controller: TwoFAController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TwoFAController],
      providers: [TwoFAService],
    }).compile();

    controller = module.get<TwoFAController>(TwoFAController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
