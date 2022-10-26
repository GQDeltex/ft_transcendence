import { Test, TestingModule } from '@nestjs/testing';
import { GameResolver } from './game.resolver';
import { GameService } from './game.service';
import { Game } from './entities/game.entity';
import { MockRepo } from '../tools/memdb.mock';

describe('GameResolver', () => {
  let resolver: GameResolver;
  let mockRepoGame: MockRepo;

  beforeEach(async () => {
    mockRepoGame = new MockRepo('GameResolver', Game);
    await mockRepoGame.setupDb();

    const module: TestingModule = await Test.createTestingModule({
      providers: [GameResolver, GameService, mockRepoGame.getProvider()],
    }).compile();

    resolver = module.get<GameResolver>(GameResolver);
  });

  afterEach(async () => {
    await mockRepoGame.clearRepo();
  });

  afterAll(async () => {
    await mockRepoGame.destroyRepo();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
