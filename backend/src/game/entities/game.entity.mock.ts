import { Game, GameState } from './game.entity';
import { mockUser } from '../../users/entities/user.entity.mock';

export const mockGame: Game = {
  id: 986321,
  player1: mockUser,
  player1Id: mockUser.id,
  player2: mockUser,
  player2Id: mockUser.id,
  score1: 0,
  score2: 0,
  state: GameState.STARTING,
  player1BlurTime: new Date(0),
  player2BlurTime: new Date(0),
  isReplayHost: false,
  replayUrl: '',
};
