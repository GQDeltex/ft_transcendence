import { Element, Vector } from './element';
import { socket } from '../../service/socket';

export class Paddle extends Element {
  private _direction: Vector;
  private _speed: number;
  private _shape: Vector;
  private _time = 0;

  constructor(
    padElement: HTMLElement | null,
    field: null | DOMRect,
    gameId: number,
  ) {
    super(padElement, gameId);
    this._direction = new Vector(0, 0);
    this._speed = 10;
    this._shape = new Vector(
      field !== null
        ? (super.getWidth() / Math.abs(field.right - field.left)) * 100
        : 0,
      field !== null
        ? (super.getHeight() / Math.abs(field.bottom - field.top)) * 100
        : 0,
    );
  }

  // later functions depend on pixel values in screen
  // when resizing the game window changes and is refreshed in this function
  reeesize(pField: null | DOMRect, pPad: null | DOMRect) {
    super.resize(pPad);
    this._shape.x =
      pField !== null ? (super.getWidth() / pField.width) * 100 : 0;
    this._shape.y =
      pField !== null ? (super.getHeight() / pField.height) * 100 : 0;
  }

  gety(): number {
    if (this._htmlElem != null)
      return parseFloat(
        getComputedStyle(this._htmlElem).getPropertyValue('--y'),
      );
    else console.log('8 failiure, no object assigned\n');
    return 2147483647;
  }
  sety(value: number) {
    if (this._htmlElem != null)
      this._htmlElem.style.setProperty('--y', String(value));
    else console.log('9 failiure, no object assigned\n');
  }

  changeDir(dir: number, isOpponent = false) {
    if (this._direction.y === dir) return;
    this._direction.y = dir;
    if (!isOpponent) {
      socket.emit('gameData', {
        changeDir: dir,
        name: 'opponent',
        gameId: this._gameId,
      });
    }
  }

  step() {
    let g: number =
      parseFloat(String(this.gety())) +
      parseFloat(String(this._speed * this._direction.y * 0.001));
    if (g < 0 + this._shape.y / 2) g = this._shape.y / 2;
    if (g > 100 - this._shape.y / 2) g = 100 - this._shape.y / 2;
    this.sety(g);
  }

  // function to calc the next frame, babysteps for better movement
  update(delta: number, time: number) {
    this._time = time;
    let i = 0;
    while (i < delta) {
      this.step();
      i++;
    }
  }
}
