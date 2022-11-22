export class Element {
  public _htmlElem: HTMLElement | null;
  private boundBox: DOMRect | null;
  public _gameId: number;

  constructor(fieldElem: HTMLElement | null, gameId: number) {
    this._htmlElem = fieldElem;
    this._gameId = gameId;
    this.boundBox = this.getRect();
  }
  getRect(): DOMRect | null {
    if (this._htmlElem !== null) return this._htmlElem.getBoundingClientRect();
    else console.log('3 failiure, no object assigned\n');
    return null;
  }
  getWidth(): number {
    if (this.boundBox === null) return 42;
    return Math.abs(this.boundBox.left - this.boundBox.right);
  }
  getHeight(): number {
    if (this.boundBox === null) return 42;
    return Math.abs(this.boundBox.bottom - this.boundBox.top);
  }
  resize(pElement: DOMRect | null) {
    this.boundBox = pElement;
  }
}

export class Vector {
  constructor(public x: number, public y: number) {
    return this;
  }

  // keep the direction of a vector, but resize to length of 1
  normalize() {
    const temp: number = Math.pow(
      Math.pow(this.x, 2) + Math.pow(this.y, 2),
      0.5,
    );
    this.x /= temp;
    this.y /= temp;
    return this;
  }
}
