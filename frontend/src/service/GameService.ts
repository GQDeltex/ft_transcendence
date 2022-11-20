import type { Vector } from '@/components/game/element';
import type { User } from '@/store/user';
import graphQLService from './GraphQLService';

export type GameLogData = {
  timestamp: number;
  name: string;
  ballDirection: Vector;
  ballPosition: Vector;
  paddleHostDirection: number;
  paddleClientDirection: number;
  score: number[];
};

export type Game = {
  id: number;
  player1: User;
  player2: User;
  score1: number;
  score2: number;
  state: string;
  logData: GameLogData[];
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
                    logData {
                      name
                      timestamp
                      ballDirection {
                        x
                        y
                      }
                      ballPosition {
                        x
                        y
                      }
                      paddleHostDirection
                      paddleClientDirection
                      score
                    }
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
