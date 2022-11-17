import { Element, Vector } from './element';
import { socket } from '../../service/socket';

export class Paddle {
  private _position: Vector;
  private _direction: number;
  private readonly _speed: number = 0.0069;
  private _ctx: CanvasRenderingContext2D;
  // private _time = 0;

  constructor(
    private readonly _gameId: number,
    private readonly _canvas: HTMLCanvasElement,
    private _img: HTMLImageElement,
    private readonly isLeft: boolean = true,
  ) {
    this._position = new Vector(0, 0);
    this._position.x = isLeft
      ? this._canvas.width * 0.01
      : this._canvas.width * 0.99 - this.getWidth();
    this._position.y = this._canvas.height / 2 - this.getHeight() / 2;
    this._direction = 0;
    this._ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  setDir(direction: number, toEmit = true) {
    if (this._direction === direction) return;
    this._direction = direction;
    if (toEmit)
      socket.emit('gameData', {
        paddleDir: direction,
        name: 'opponent',
        gameId: this._gameId,
      });
  }

  resize(oldWidth: number, oldHeight: number) {
    this._position.x *= this._canvas.width / oldWidth;
    this._position.y *= this._canvas.height / oldHeight;
  }

  getWidth(): number {
    return this._canvas.width * 0.0169;
  }

  getHeight(): number {
    return this._canvas.width * 0.1069;
  }

  getPosX(): number {
    return this._position.x;
  }

  getPosY(): number {
    return this._position.y;
  }

  // changeDir(dir: number, isOpponent = false, emitter: boolean) {
  //   if (this._direction.y === dir) return;
  //   this._direction.y = dir;
  //   if (!isOpponent && emitter) {
  //     socket.emit('gameData', {
  //       changeDir: dir,
  //       name: 'opponent',
  //       gameId: this._gameId,
  //     });
  //   }
  // }

  step() {
    const newY =
      this._position.y + this._direction * this._speed * this._canvas.width;
    if (newY < 0 || newY + this.getHeight() > this._canvas.height) return;
    this._position.y = newY;
  }

  draw() {
    this.step();
    this._ctx.drawImage(
      this._img,
      this._position.x,
      this._position.y,
      this.getWidth(),
      this.getHeight(),
    );
  }
}
