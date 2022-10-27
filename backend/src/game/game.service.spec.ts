import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { Game } from './entities/game.entity';
import { mockGame } from './entities/game.entity.mock';
import { User } from '../users/entities/user.entity';
import { mockUser } from '../users/entities/user.entity.mock';
import { MockDB } from '../tools/memdbv2.mock';

describe('GameService', () => {
  let service: GameService;
  let mockDB: MockDB;

  beforeEach(async () => {
    mockDB = await new MockDB('GameService').setupDB();
    await mockDB.prefillDB(User, [mockUser]);
    await mockDB.prefillDB(Game, [mockGame]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [GameService, await mockDB.getProvider(Game)],
    }).compile();

    service = module.get<GameService>(GameService);
  });

  afterEach(async () => {
    await mockDB.destroySource();
  });

  afterAll(async () => {
    await mockDB.destroyDB();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
