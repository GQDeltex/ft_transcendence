import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { GameGateway } from './game.gateway';

describe('GameGateway', () => {
  let gateway: GameGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameGateway, ConfigService],
    }).compile();

    gateway = module.get<GameGateway>(GameGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
