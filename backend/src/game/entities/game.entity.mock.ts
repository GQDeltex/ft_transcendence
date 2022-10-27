import { Game, GameState } from './game.entity';
import { mockUser } from '../../users/entities/user.entity.mock';

export const mockGame: Game = {
  id: 986321,
  player1: mockUser,
  player2: mockUser,
  score1: 0,
  score2: 0,
  state: GameState.STARTING,
};
