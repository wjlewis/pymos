import { Vec } from './Vec';

export class Anim<A> {
  constructor(public fn: AnimBehavior<A>, public duration: number) {}

  then(after: Anim<A>): Anim<A> {
    return new Anim(t => {
      if (t < this.duration) {
        return this.fn(t);
      } else {
        return after.fn(t - this.duration);
      }
    }, this.duration + after.duration);
  }

  static Wait<A>(value: A, duration: number): Anim<A> {
    return new Anim(t => value, duration);
  }

  static Ease<V extends number | Vector>(
    from: V,
    to: V,
    duration: number
  ): Anim<V> {
    if (typeof from === 'number' && typeof to === 'number') {
      return Anim.EaseNumber(from, to, duration) as Anim<V>;
    } else {
      return Anim.EaseVector(from as Vector, to as Vector, duration) as Anim<V>;
    }
  }

  static Fork<A>(anims: { [key: string]: Anim<any> }): Anim<A> {
    const durations = Object.values(anims).map(({ duration }) => duration);
    const duration = Math.max(...durations, 0);

    return new Anim(t => {
      const out = Object.keys(anims).reduce(
        (acc, key) => ({
          ...acc,
          [key]: anims[key].fn(t),
        }),
        {}
      );
      return out;
    }, duration) as Anim<A>;
  }

  private static EaseNumber(
    from: number,
    to: number,
    duration: number
  ): Anim<number> {
    const diff = to - from;
    return new Anim(t => {
      if (t < duration) {
        const tNorm = t / duration;
        return from + diff * tNorm * tNorm * (3 - 2 * tNorm);
      } else {
        return to;
      }
    }, duration);
  }

  private static EaseVector<V extends Vector>(
    from: V,
    to: V,
    duration: number
  ): Anim<V> {
    const diff = to.plus(from.times(-1));
    return new Anim(t => {
      if (t < duration) {
        const tNorm = t / duration;
        return from.plus(diff.times(tNorm * tNorm * (3 - 2 * tNorm)));
      } else {
        return to;
      }
    }, duration);
  }
}

interface AnimBehavior<A> {
  (frame: number): A;
}

export interface Vector {
  plus(rhs: any): any;
  times(scalar: any): any;
}

function animSvgPath(pts: Vec[], duration: number): Anim<string> {
  const pts1 = [...pts, pts[0]];
  const segmentDuration = duration / (pts1.length - 1);

  return new Anim(t => {
    if (t < duration) {
      const seg = Math.floor(t / segmentDuration);
      const from = pts1[seg];
      const to = pts1[seg + 1];
      const tNorm = (t - seg * segmentDuration) / segmentDuration;
      const pos = from.plus(
        to.minus(from).times(tNorm * tNorm * (3 - 2 * tNorm))
      );
      const fixed = pts1
        .slice(0, seg + 1)
        .map(pt => `${pt.x} ${pt.y}`)
        .join(' L ');
      return `M ${fixed} L ${pos.x} ${pos.y}`;
    } else {
      return `M ${pts.map(pt => `${pt.x} ${pt.y}`).join(' L ')} Z`;
    }
  }, duration);
}

function animMeasurement(
  start: Vec,
  end: Vec,
  crossLength: number,
  duration: number
): Anim<string> {
  const crossDuration = 0.2 * duration;
  const lineDuration = 0.6 * duration;

  const mainLine = end.minus(start);
  const perp = mainLine
    .perp()
    .norm()
    .times(crossLength / 2);
  const crossStart1 = start.plus(perp);
  const crossStart2 = start.minus(perp);
  const crossEnd1 = end.plus(perp);
  const crossEnd2 = end.minus(perp);
  const fullCross = perp.times(-2);

  const crossStartPath = `M ${crossStart1.x} ${crossStart1.y} L ${crossStart2.x} ${crossStart2.y}`;
  const linePath = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
  const crossEndPath = `M ${crossEnd1.x} ${crossEnd1.y} L ${crossEnd2.x} ${crossEnd2.y}`;

  return new Anim(t => {
    if (t < crossDuration) {
      // First cross
      const tNorm = t / crossDuration;
      const crossPos = crossStart1.plus(fullCross.times(tNorm));
      return `M ${crossStart1.x} ${crossStart1.y} L ${crossPos.x} ${crossPos.y}`;
    } else if (crossDuration <= t && t < crossDuration + lineDuration) {
      // Main line
      const tNorm = (t - crossDuration) / lineDuration;
      const linePos = start.plus(
        mainLine.times(tNorm * tNorm * (3 - 2 * tNorm))
      );
      return `${crossStartPath} M ${start.x} ${start.y} L ${linePos.x} ${linePos.y}`;
    } else if (
      crossDuration + lineDuration <= t &&
      t < crossDuration + lineDuration + crossDuration
    ) {
      // Second cross
      const tNorm = (t - crossDuration - lineDuration) / crossDuration;
      const crossPos = crossEnd1.plus(fullCross.times(tNorm));
      return `${crossStartPath} ${linePath} M ${crossEnd1.x} ${crossEnd1.y} L ${crossPos.x} ${crossPos.y}`;
    } else {
      // Full path
      return `${crossStartPath} ${linePath} ${crossEndPath}`;
    }
  }, duration);
}

export const Extras = {
  SvgPath: animSvgPath,
  Measurement: animMeasurement,
};
