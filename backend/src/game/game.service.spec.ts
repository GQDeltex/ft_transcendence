import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { Game } from './entities/game.entity';
import { MockRepo } from '../tools/memdb.mock';

describe('GameService', () => {
  let service: GameService;
  let mockRepoGame: MockRepo;

  beforeEach(async () => {
    mockRepoGame = new MockRepo('GameService', Game);
    await mockRepoGame.setupDb();

    const module: TestingModule = await Test.createTestingModule({
      providers: [GameService, mockRepoGame.getProvider()],
    }).compile();

    service = module.get<GameService>(GameService);
  });

  afterEach(async () => {
    await mockRepoGame.clearRepo();
  });

  afterAll(async () => {
    await mockRepoGame.destroyRepo();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
