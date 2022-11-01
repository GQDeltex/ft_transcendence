import { socket } from '@/service/socket';
import { Element, Vector } from './element';

export class Ball extends Element {
  // width and height in % of window
  public _shape: Vector;
  // private _direction: Vector; get-set- soon™
  public _direction: Vector;
  private _speed: number;
  private _priority: boolean;

  private invinc = 0;
  private maxinvinc: number;
  constructor(
    ballElem: HTMLElement | null,
    field: null | DOMRect,
    gameId: number,
    priority: boolean,
  ) {
    super(ballElem, gameId);
    this._priority = priority;
    this._direction = new Vector(0, 0);
    this._speed = 10;
    this.maxinvinc = this._speed * 10;
    this._shape = new Vector(
      field !== null
        ? (super.getWidth() / Math.abs(field.right - field.left)) * 100
        : 0,
      field !== null
        ? (super.getHeight() / Math.abs(field.bottom - field.top)) * 100
        : 0,
    );
    this.reset([0, 0]);
  }

  // later functions depend on pixel values in screen
  // when resizing the game window changes and is refreshed in this function
  reeesize(pField: null | DOMRect, pBall: null | DOMRect) {
    super.resize(pBall);
    this._shape.x =
      pField !== null
        ? (super.getWidth() / Math.abs(pField.right - pField.left)) * 100
        : 0;
    this._shape.y =
      pField !== null
        ? (super.getHeight() / Math.abs(pField.bottom - pField.top)) * 100
        : 0;
  }

  reset(score: number[]) {
    this.set_pos_x(50);
    this.set_pos_y(50);
    this._direction.x = Math.random() > 0.5 ? 1 : -1;
    this._direction.y = Math.random() * 4 - 2;
    if (this._priority) {
      socket.emit('gameData', {
        changeDir: [
          -this._direction.x,
          this._direction.y,
          this.get_pos_x(),
          this.get_pos_y(),
        ],
        score: score,
        name: 'ball',
        gameId: this._gameId,
      });
    }
    this.invinc = this.maxinvinc;
  }

  changeDir(dir: number[]) {
    if (!(typeof dir[2] === 'undefined' || typeof dir[2] === 'undefined')) {
      this.set_pos_x(dir[2]);
      this.set_pos_y(dir[3]);
    }
    this._direction.x = dir[0];
    this._direction.y = dir[1];
  }

  get_dir_x(): number {
    return this._direction.x;
  }
  get_dir_y(): number {
    return this._direction.y;
  }
  set_dir_x(n: number) {
    this._direction.x = n;
  }
  set_dir_y(n: number) {
    this._direction.y = n;
  }
  get_pos_x(): number {
    if (this._htmlElem != null)
      return parseFloat(
        getComputedStyle(this._htmlElem).getPropertyValue('--x'),
      );
    else console.log('4 failiure, no object assigned\n');
    return 2147483647;
  }
  set_pos_x(value: number) {
    if (this._htmlElem != null)
      this._htmlElem.style.setProperty('--x', String(value));
    else console.log('5 failiure, no object assigned\n');
  }
  get_pos_y(): number {
    if (this._htmlElem != null)
      return parseFloat(
        getComputedStyle(this._htmlElem).getPropertyValue('--y'),
      );
    else console.log('6 failiure, no object assigned\n');
    return 2147483647;
  }
  set_pos_y(value: number) {
    if (this._htmlElem != null)
      this._htmlElem.style.setProperty('--y', String(value));
    else console.log('7 failiure, no object assigned\n');
  }

  step(paddleOp: null | DOMRect) {
    //move step
    this.set_pos_x(
      parseFloat(String(this.get_pos_x())) +
        parseFloat(String(this._speed * this._direction.x * 0.001)),
    );
    this.set_pos_y(
      parseFloat(String(this.get_pos_y())) +
        parseFloat(String(this._speed * this._direction.y * 0.001)),
    );
    // vertical reflection
    if (
      this.get_pos_y() >= 100 - this._shape.y / 2 ||
      this.get_pos_y() <= 0 + this._shape.y / 2
    ) {
      this._direction.y *= -1;
      this.set_pos_y(
        parseFloat(String(this.get_pos_y())) +
          parseFloat(String(this._speed * this._direction.y * 0.002)),
      );
    }
    // paddle collision
    const rect: DOMRect | null = super.getRect();
    if (rect === null) return;
    if (this.invinc <= 0 && this.isCollision(paddleOp, rect)) {
      this.invinc = this.maxinvinc;
      this._direction.x = -1;
      this.set_pos_x(
        parseFloat(String(this.get_pos_x())) +
          parseFloat(String(this._speed * this._direction.x * 0.002)),
      );
      if (this._direction.x < 0) {
        socket.emit('gameData', {
          changeDir: [
            -this._direction.x,
            this._direction.y,
            100 - this.get_pos_x(),
            this.get_pos_y(),
          ],
          name: 'ball',
          gameId: this._gameId,
        });
      }
    }
    this.invinc--;
  }

  isCollision(padBox: null | DOMRect, ballBox: null | DOMRect): boolean {
    if (padBox === null || ballBox === null) return false;
    if (
      padBox.left <= ballBox.right &&
      padBox.right >= ballBox.left &&
      padBox.top <= ballBox.bottom &&
      padBox.bottom >= ballBox.top
    ) {
      this._direction.y =
        2 *
        (((ballBox.top + (ballBox.bottom - ballBox.top) / 2 - padBox.top) /
          (padBox.bottom - padBox.top)) *
          2 -
          1);
      return true;
    }
    return false;
  }

  public update(delta: number, paddleOp: null | DOMRect) {
    let i = 0;
    while (i < delta) {
      this.step(paddleOp);
      i++;
    }
  }
}
