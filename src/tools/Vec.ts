import { Vector } from './Anim';

export class Vec implements Vector {
  constructor(public x: number, public y: number) {}

  plus(rhs: Vec): Vec {
    return new Vec(this.x + rhs.x, this.y + rhs.y);
  }

  times(scalar: number): Vec {
    return new Vec(scalar * this.x, scalar * this.y);
  }

  minus(rhs: Vec): Vec {
    return new Vec(this.x - rhs.x, this.y - rhs.y);
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  norm(): Vec {
    const length = this.length();
    if (length === 0) {
      throw new Error('attempt to norm 0-vector');
    }

    return this.times(1 / length);
  }

  dot(rhs: Vec): number {
    return this.x * rhs.x + this.y * rhs.y;
  }

  proj(rhs: Vec): Vec {
    const denom = rhs.dot(rhs);
    if (denom === 0) {
      throw new Error('attempt to project onto the 0-vector');
    }

    const num = this.dot(rhs);
    return rhs.times(num / denom);
  }

  perp(): Vec {
    return new Vec(-this.y, this.x);
  }

  rotate(angle: number): Vec {
    const { x, y } = this;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    return new Vec(cos * x - sin * y, sin * x + cos * y);
  }

  cross(rhs: Vec): number {
    return this.x * rhs.y - this.y * rhs.x;
  }

  angle(): number {
    const angle = Math.atan2(this.y, this.x);
    return angle < 0 ? angle + 2 * Math.PI : angle;
  }
}
