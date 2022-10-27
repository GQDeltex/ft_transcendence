export class Element {
  public _htmlElem: HTMLElement | null;
  private boundBox: DOMRect | null;

  constructor(fieldElem: HTMLElement | null) {
    this._htmlElem = fieldElem;
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
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  // keep the direction of a vector, but resize to length of 1
  unit_vec() {
    const temp: number = Math.pow(
      Math.pow(this.x, 2) + Math.pow(this.y, 2),
      0.5,
    );
    this.x /= temp;
    this.y /= temp;
  }
}
