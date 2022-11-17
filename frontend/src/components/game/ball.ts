import { socket } from '@/service/socket';
import type { Ref } from 'vue';
import { Vector } from './element';
import type { Paddle } from './paddle';

export enum Priority {
  HOST,
  CLIENT,
  VIEWER,
}

export class Ball {
  private _direction: Vector;
  private _position: Vector;
  private _speed: number;
  private readonly _defaultSpeed = 0.003;
  private _ctx: CanvasRenderingContext2D;

  constructor(
    private readonly _gameId: number,
    private readonly _canvas: HTMLCanvasElement,
    private _img: HTMLImageElement,
    private readonly _isPlayer: boolean,
    isHost: boolean,
  ) {
    this._ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D;
    this._speed = this._defaultSpeed;
    this._direction = new Vector(0, 0);
    this._position = new Vector(0, 0);
    this.reset(0, 0, isHost);
  }

  /**
   * Get ball size based on canvas width
   */
  getBallSize() {
    return 0.0369 * this._canvas.width;
  }

  /**
   * Reset the ball to the center of the screen and give it a random direction
   * Emit the new game data to the server if player is the host
   */
  reset(yourScore: number, otherScore: number, isHost = true) {
    this._position.x = this._canvas.width / 2 - this.getBallSize() / 2;
    this._position.y = this._canvas.height / 2 - this.getBallSize() / 2;
    this._direction.x = Math.random() > 0.5 ? 1 : -1;
    this._direction.y = Math.random() * 4 - 2;

    if (isHost)
      socket.emit('gameData', {
        name: 'ball',
        gameId: this._gameId,
        direction: {
          x: -this._direction.x,
          y: this._direction.y,
        },
        position: {
          x: this._position.x / this._canvas.width,
          y: this._position.y / this._canvas.width,
        },
        score: [yourScore, otherScore],
      });
  }

  /**
   * Set the ball position
   * @param relativeNewPos relative position to the canvas
   */
  setPos(relativeNewPos: Vector) {
    const newVector = new Vector(0, 0);
    newVector.x = relativeNewPos.x * this._canvas.width;
    newVector.y = relativeNewPos.y * this._canvas.width;
    this._position = newVector;
  }

  setDir(newDir: Vector) {
    this._direction = newDir;
  }

  resize(oldCanvasWidth: number, oldCanvasHeight: number) {
    this._position.x *= this._canvas.width / oldCanvasWidth;
    this._position.y *= this._canvas.height / oldCanvasHeight;
  }

  setSpeed(value: number = this._defaultSpeed) {
    this._speed = value;
  }

  private isTopBottomCollision(): boolean {
    return (
      this._position.y <= 0 ||
      this._position.y + this.getBallSize() >= this._canvas.height
    );
  }

  private isPaddleCollision(checkPaddle: Paddle): boolean {
    return (
      this._position.x + this.getBallSize() >= checkPaddle.getPosX() &&
      this._position.y + this.getBallSize() >= checkPaddle.getPosY() &&
      this._position.y <= checkPaddle.getPosY() + checkPaddle.getHeight()
    );
  }

  private isLost(): boolean {
    return this._position.x + this.getBallSize() >= this._canvas.width;
  }

  private step(
    yourPaddle: Paddle,
    yourScore: Ref<number>,
    otherScore: Ref<number>,
  ) {
    this._position.y += this._direction.y * this._speed * this._canvas.width;
    this._position.x += this._direction.x * this._speed * this._canvas.width;

    if (this.isTopBottomCollision()) this._direction.y *= -1;

    if (this.isPaddleCollision(yourPaddle) && this._isPlayer) {
      this._direction.x = -1;
      this._direction.y =
        3 *
        (((this._position.x + this.getBallSize() / 2 - yourPaddle.getPosX()) /
          yourPaddle.getHeight()) *
          2 -
          1); // TODO: fix this
      socket.emit('gameData', {
        name: 'ball',
        gameId: this._gameId,
        direction: {
          x: 1,
          y: this._direction.y,
        },
        position: {
          x:
            (this._canvas.width - this._position.x - this.getBallSize()) /
            this._canvas.width,
          y: this._position.y / this._canvas.width,
        },
      });
    }

    if (this.isLost()) {
      otherScore.value++;
      this.reset(yourScore.value, otherScore.value);
    }
  }

  draw(yourPaddle: Paddle, yourScore: Ref<number>, otherScore: Ref<number>) {
    this.step(yourPaddle, yourScore, otherScore);
    this._ctx.drawImage(
      this._img,
      this._position.x,
      this._position.y,
      this.getBallSize(),
      this.getBallSize(),
    );
  }
}
