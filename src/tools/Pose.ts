import { Vector } from './index';
import { Vec } from './Vec';

export class Pose implements Vector {
  constructor(public loc: Vec, public angle: number) {}

  plus(rhs: Pose): Pose {
    return new Pose(this.loc.plus(rhs.loc), this.angle + rhs.angle);
  }

  times(scalar: number): Pose {
    return new Pose(this.loc.times(scalar), scalar * this.angle);
  }
}
