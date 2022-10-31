import graphQLService from './GraphQLService';

export type Game = {
  id: number;
  player1: {
    id: number;
    username: string;
  };
  player2: {
    id: number;
    username: string;
  };
  score1: number;
  score2: number;
  state: string;
};

class GameService {
  async findAll(state?: string, userId?: number): Promise<Game[]> {
    const { games } = await graphQLService.query(
      `
            query($state: String, $userId: Int) {
                games(state: $state, user: $userId) {
                    id
                    player1 {
                        id
                        username
                    }
                    player2 {
                        id
                        username
                    }
                    score1
                    score2
                    state
                }
            }
            `,
      {
        state: state,
        userId: userId,
      },
    );
    if (typeof games === 'undefined') throw new Error('Empty games data');
    return games;
  }

  async findOne(gameId: number): Promise<Game> {
    const { game } = await graphQLService.query(
      `
            query($gameId: Int!) {
                game(id: $gameId) {
                    id
                    player1 {
                        id
                        username
                    }
                    player2 {
                        id
                        username
                    }
                    score1
                    score2
                    state
                }
            }
            `,
      {
        gameId: gameId,
      },
    );
    if (typeof game === 'undefined') throw new Error('Empty game data');
    return game;
  }
}

export default new GameService();