import { socket } from '@/service/socket';
import type { Ref } from 'vue';
import type { Paddle } from './paddle';

export enum Priority {
  HOST,
  CLIENT,
  VIEWER,
}

export class Vector {
  constructor(public x: number, public y: number) {}
}

export class Ball {
  private _direction: Vector;
  private _position: Vector;
  private _speed: number;
  private readonly _defaultSpeed = 0.00032;
  private readonly _relativeBallSize = 0.0369;
  private _ctx: CanvasRenderingContext2D;

  constructor(
    private readonly _gameId: number,
    private readonly _canvas: HTMLCanvasElement,
    private _img: HTMLImageElement,
    private readonly _priority: Priority,
  ) {
    this._ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D;
    this._speed = this._defaultSpeed;
    this._direction = new Vector(0, 0);
    this._position = new Vector(0, 0);
    this.reset(0, 0, this._priority === Priority.HOST);
  }

  /**
   * Get ball size based on canvas width
   */
  getBallSize() {
    return this._relativeBallSize * this._canvas.width;
  }

  getRelativeBallSize() {
    return this._relativeBallSize;
  }

  /**
   * Reset the ball to the center of the screen and give it a random direction
   * Emit the new game data to the server if player is the host
   */
  reset(yourScore: number, otherScore: number, toEmit = true) {
    this._position.x = this._canvas.width / 2 - this.getBallSize() / 2;
    this._position.y = this._canvas.height / 2 - this.getBallSize() / 2;
    this._direction = new Vector(0, 0);

    if (toEmit) {
      this._direction.x = Math.random() > 0.5 ? 1 : -1;
      this._direction.y = Math.random() * 4 - 2;
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
        score:
          this._priority === Priority.HOST
            ? [yourScore, otherScore]
            : [otherScore, yourScore],
      });
    }
  }

  getAll() {
    const relativePos = new Vector(
      this._position.x / this._canvas.width,
      this._position.y / this._canvas.width,
    );
    return {
      position: relativePos,
      direction: this._direction,
    };
  }

  setAll(data: { position: Vector; direction: Vector }) {
    this._position.x = data.position.x * this._canvas.width;
    this._position.y = data.position.y * this._canvas.width;
    this._direction = new Vector(data.direction.x, data.direction.y);
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
    this._direction = new Vector(newDir.x, newDir.y);
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
    elapsedTime: number,
    yourPaddle: Paddle,
    yourScore: Ref<number>,
    otherScore: Ref<number>,
  ) {
    this._position.y +=
      this._direction.y * this._speed * this._canvas.width * elapsedTime;
    this._position.x +=
      this._direction.x * this._speed * this._canvas.width * elapsedTime;

    if (this.isTopBottomCollision()) {
      this._direction.y *= -1;
      this._position.y +=
        this._direction.y * this._speed * this._canvas.width * elapsedTime * 2;
    }

    if (
      this.isPaddleCollision(yourPaddle) &&
      this._priority !== Priority.VIEWER
    ) {
      this._direction.x = -1;
      this._direction.y =
        2 *
        (((this._position.y + this.getBallSize() / 2 - yourPaddle.getPosY()) /
          yourPaddle.getHeight()) *
          2 -
          1);
      this._position.x +=
        this._direction.x * this._speed * this._canvas.width * elapsedTime * 2;
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

    if (this.isLost() && this._priority !== Priority.VIEWER) {
      otherScore.value++;
      this.reset(yourScore.value, otherScore.value);
    }
  }

  draw(
    elapsedTime: number,
    yourPaddle: Paddle,
    yourScore: Ref<number>,
    otherScore: Ref<number>,
  ) {
    this.step(elapsedTime, yourPaddle, yourScore, otherScore);
    this._ctx.drawImage(
      this._img,
      this._position.x,
      this._position.y,
      this.getBallSize(),
      this.getBallSize(),
    );
  }
}
