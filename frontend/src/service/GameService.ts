import type { User } from '@/store/user';
import graphQLService from './GraphQLService';

export type Game = {
  id: number;
  player1: User;
  player2: User;
  score1: number;
  score2: number;
  state: string;
  isReplayHost: boolean;
  replayUrl: string;
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
                      intra
                      firstname
                      lastname
                      username
                      title
                      picture
                      campus
                      country
                      coalition
                      status
                      lastLoggedIn
                      equipped {
                        id
                        type
                        name
                        description
                        picture
                        metadata
                      }
                    }
                    player2 {
                      id
                      intra
                      firstname
                      lastname
                      username
                      title
                      picture
                      campus
                      country
                      coalition
                      status
                      lastLoggedIn
                      equipped {
                        id
                        type
                        name
                        description
                        picture
                        metadata
                      }
                    }
                    score1
                    score2
                    state
                    isReplayHost
                    replayUrl
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
                      intra
                      firstname
                      lastname
                      username
                      title
                      picture
                      campus
                      country
                      coalition
                      status
                      lastLoggedIn
                      equipped {
                        id
                        type
                        name
                        description
                        picture
                        metadata
                      }
                    }
                    player2 {
                      id
                      intra
                      firstname
                      lastname
                      username
                      title
                      picture
                      campus
                      country
                      coalition
                      status
                      lastLoggedIn
                      equipped {
                        id
                        type
                        name
                        description
                        picture
                        metadata
                      }
                    }
                    score1
                    score2
                    state
                    isReplayHost
                    replayUrl
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
