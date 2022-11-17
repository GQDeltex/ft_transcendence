import { socket } from '@/service/socket';
import { disableFragmentWarnings } from 'graphql-tag';
import type { Ref } from 'vue';
import { Element, Vector } from './element';
import type { Paddle } from './paddle';

export class Ball {
  // width and height in % of window
  // private _direction: Vector; get-set- soon™
  private _direction: Vector;
  private _speed: number;
  private readonly _defaultSpeed = 0.003;
  private _position: Vector;
  private _ctx: CanvasRenderingContext2D;
  // private invinc = 0;
  // private maxinvinc: number;
  constructor(
    private readonly _gameId: number,
    // private readonly _priority: number,
    // emitter: boolean,
    private readonly _canvas: HTMLCanvasElement,
    private _img: HTMLImageElement,
    isMe: boolean,
  ) {
    this._ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D;
    this._speed = this._defaultSpeed;
    this._direction = new Vector(0, 0);
    this._position = new Vector(0, 0);
    this.reset(0, 0, isMe);
    // this.maxinvinc = this._speed * 10;
  }

  getBallSize() {
    return 0.0369 * this._canvas.width;
  }

  reset(playerScore: number, remoteScore: number, isMe = true) {
    this._position.x = this._canvas.width / 2 - this.getBallSize() / 2;
    this._position.y = this._canvas.height / 2 - this.getBallSize() / 2;
    // this._direction.x = Math.random() > 0.5 ? 1 : -1;
    // this._direction.y = Math.random() * 4 - 2;
    this._direction = new Vector(1, 0);

    if (isMe)
      socket.emit('gameData', {
        direction: {
          x: -this._direction.x,
          y: this._direction.y,
        },
        position: {
          x: this._position.x / this._canvas.width,
          y: this._position.y / this._canvas.width,
        },
        score: [playerScore, remoteScore],
        name: 'ball',
        gameId: this._gameId,
      });
  }

  getDirX(): number {
    return this._direction.x;
  }

  getDirY(): number {
    return this._direction.y;
  }

  getPosX() {
    return this._position.x;
  }

  getPosY() {
    return this._position.y;
  }

  setPos(relativeNewPos: Vector) {
    const newVector = new Vector(0, 0);
    newVector.x = relativeNewPos.x * this._canvas.width;
    newVector.y = relativeNewPos.y * this._canvas.width;
    this._position = newVector;
  }

  setDir(newDir: Vector) {
    this._direction = newDir;
  }

  resize(oldWidth: number, oldHeight: number) {
    this._position.x *= this._canvas.width / oldWidth;
    this._position.y *= this._canvas.height / oldHeight;
  }

  setSpeed(value: number = this._defaultSpeed) {
    this._speed = value;
  }

  // isTempPaddleCollision(checkPaddle: Paddle): boolean {
  //   return (
  //     this._position.x <= checkPaddle.getPosX() + checkPaddle.getWidth() &&
  //     this._position.y + this.getBallSize() >= checkPaddle.getPosY() &&
  //     this._position.y <= checkPaddle.getPosY() + checkPaddle.getHeight()
  //   );
  // }

  isPaddleCollision(checkPaddle: Paddle): boolean {
    return (
      this._position.x + this.getBallSize() >= checkPaddle.getPosX() &&
      this._position.y + this.getBallSize() >= checkPaddle.getPosY() &&
      this._position.y <= checkPaddle.getPosY() + checkPaddle.getHeight()
    );
  }

  isLost(): boolean {
    return this._position.x + this.getBallSize() >= this._canvas.width;
  }

  step(
    leftPaddle: Paddle,
    rightPaddle: Paddle,
    playerScore: Ref<number>,
    remoteScore: Ref<number>,
  ) {
    this._position.y += this._direction.y * this._speed * this._canvas.width;
    this._position.x += this._direction.x * this._speed * this._canvas.width;

    if (
      this._position.y <= 0 ||
      this._position.y >= this._canvas.height - this.getBallSize()
    )
      this._direction.y *= -1;

    if (this.isPaddleCollision(rightPaddle)) {
      this._direction.x = -1;
      socket.emit('gameData', {
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
        name: 'ball',
        gameId: this._gameId,
      });
    }

    if (this.isLost()) {
      playerScore.value++;
      this.reset(playerScore.value, remoteScore.value);
    }
    // paddle collision
    // const rect: DOMRect | null = super.getRect();
    // if (rect === null) return;
    // if (emitter && this.invinc <= 0 && this.isCollision(paddleOp, rect)) {
    //   this.invinc = this.maxinvinc;
    //   this._direction.x = -1;
    //   this.set_pos_x(
    //     parseFloat(String(this.getPosX())) +
    //       parseFloat(String(this._speed * this._direction.x * 0.002)),
    //   );
    //   if (this._direction.x < 0) {
    //     socket.emit('gameData', {
    //       changeDir: [
    //         -this._direction.x,
    //         this._direction.y,
    //         100 - this.getPosX(),
    //         this.get_pos_y(),
    //       ],
    //       name: 'ball',
    //       gameId: this._gameId,
    //     });
    //   }
    // }
    // this.invinc--;
  }

  // isCollision(padBox: null | DOMRect, ballBox: null | DOMRect): boolean {
  //   if (padBox === null || ballBox === null) return false;
  //   if (
  //     padBox.left <= ballBox.right &&
  //     padBox.right >= ballBox.left &&
  //     padBox.top <= ballBox.bottom &&
  //     padBox.bottom >= ballBox.top
  //   ) {
  //     this._direction.y =
  //       3 *
  //       (((ballBox.top + (ballBox.bottom - ballBox.top) / 2 - padBox.top) /
  //         (padBox.bottom - padBox.top)) *
  //         2 -
  //         1);
  //     return true;
  //   }
  //   return false;
  // }

  draw(
    leftPaddle: Paddle,
    rightPaddle: Paddle,
    playerScore: Ref<number>,
    remoteScore: Ref<number>,
  ) {
    this.step(leftPaddle, rightPaddle, playerScore, remoteScore);
    this._ctx.drawImage(
      this._img,
      this._position.x,
      this._position.y,
      this.getBallSize(),
      this.getBallSize(),
    );
  }
}
