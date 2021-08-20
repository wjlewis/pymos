import { Vec, memo } from '../tools';
import { RightTriangle } from '../state';

interface Selector<A> {
  (tri: RightTriangle): A;
}

export const vr: Selector<Vec> = memo(tri => tri.r.minus(tri.v));

export const hr: Selector<Vec> = memo(tri => tri.r.minus(tri.h));

export const vh: Selector<Vec> = memo(tri => tri.h.minus(tri.v));

export const rv: Selector<Vec> = memo(tri => vr(tri).times(-1));

export const rh: Selector<Vec> = memo(tri => hr(tri).times(-1));

export const aPerpNorm: Selector<Vec> = memo(tri => {
  return hr(tri).norm();
});

export const aPerp: Selector<Vec> = memo(tri => {
  const length = vr(tri).length();
  return aPerpNorm(tri).times(length);
});

export const a0: Selector<Vec> = memo(tri => {
  return tri.v.plus(aPerp(tri));
});

export const a1: Selector<Vec> = memo(tri => {
  return tri.r.plus(aPerp(tri));
});

export const aSquare: Selector<Vec[]> = memo(tri => [
  tri.v,
  a0(tri),
  a1(tri),
  tri.r,
]);

export const aSquareLabel: Selector<Vec> = memo(tri => {
  const half = a0(tri)
    .minus(tri.r)
    .times(1 / 2);
  return tri.r.plus(half);
});

export const bPerpNorm: Selector<Vec> = memo(tri => {
  return vr(tri).norm();
});

export const bPerp: Selector<Vec> = memo(tri => {
  const length = hr(tri).length();
  return bPerpNorm(tri).times(length);
});

export const b0: Selector<Vec> = memo(tri => {
  return tri.r.plus(bPerp(tri));
});

export const b1: Selector<Vec> = memo(tri => {
  return tri.h.plus(bPerp(tri));
});

export const bSquare: Selector<Vec[]> = memo(tri => [
  tri.r,
  b0(tri),
  b1(tri),
  tri.h,
]);

export const bSquareLabel: Selector<Vec> = memo(tri => {
  const half = b0(tri)
    .minus(tri.h)
    .times(1 / 2);
  return tri.h.plus(half);
});

export const cPerpNorm: Selector<Vec> = memo(tri => {
  const vh1 = vh(tri);
  const vr1 = vr(tri);
  const proj = vr1.proj(vh1);
  return proj.minus(vr1).norm();
});

export const cPerp: Selector<Vec> = memo(tri => {
  const length = vh(tri).length();
  return cPerpNorm(tri).times(length);
});

export const c0: Selector<Vec> = memo(tri => {
  return tri.h.plus(cPerp(tri));
});

export const c1: Selector<Vec> = memo(tri => {
  return tri.v.plus(cPerp(tri));
});

export const cSquare: Selector<Vec[]> = memo(tri => [
  tri.h,
  c0(tri),
  c1(tri),
  tri.v,
]);

export const cSquareLabel: Selector<Vec> = memo(tri => {
  const half = c0(tri)
    .minus(tri.v)
    .times(1 / 2);
  return tri.v.plus(half);
});

export const abOut: Selector<Vec> = memo(tri => {
  return b0(tri).plus(aPerp(tri));
});

export const abIn: Selector<Vec> = memo(tri => {
  return tri.h.plus(rv(tri));
});

export const cAuxV: Selector<Vec> = memo(tri => {
  const hrLength = hr(tri).length();
  const vert = rv(tri).norm().times(hrLength);
  return tri.v.plus(vert);
});

export const cAuxDiag: Selector<Vec> = memo(tri => {
  const rh1 = rh(tri);
  const length = rh1.length() + vr(tri).length();
  const out = rh1.norm().times(length);
  return cAuxV(tri).plus(out);
});

export const cAuxH: Selector<Vec> = memo(tri => {
  const vrLength = vr(tri).length();
  const horiz = rh(tri).norm().times(vrLength);
  return tri.h.plus(horiz);
});

const SIDE_MEASURE_OFFSET = 30;

export const aMeasurementPerp: Selector<Vec> = memo(tri =>
  aPerpNorm(tri).times(SIDE_MEASURE_OFFSET)
);

export const aMeasurementStart: Selector<Vec> = memo(tri =>
  tri.v.plus(aMeasurementPerp(tri))
);

export const aMeasurementEnd: Selector<Vec> = memo(tri =>
  tri.r.plus(aMeasurementPerp(tri))
);

export const bMeasurementPerp: Selector<Vec> = memo(tri =>
  bPerpNorm(tri).times(SIDE_MEASURE_OFFSET)
);

export const bMeasurementStart: Selector<Vec> = memo(tri =>
  tri.r.plus(bMeasurementPerp(tri))
);

export const bMeasurementEnd: Selector<Vec> = memo(tri =>
  tri.h.plus(bMeasurementPerp(tri))
);

export const cMeasurementPerp: Selector<Vec> = memo(tri =>
  cPerpNorm(tri).times(SIDE_MEASURE_OFFSET)
);

export const cMeasurementStart: Selector<Vec> = memo(tri =>
  tri.h.plus(cMeasurementPerp(tri))
);

export const cMeasurementEnd: Selector<Vec> = memo(tri =>
  tri.v.plus(cMeasurementPerp(tri))
);

const SIDE_LABEL_OFFSET = 20;

export const aMeasurementLabel: Selector<Vec> = memo(tri => {
  const start = aMeasurementStart(tri);
  const end = aMeasurementEnd(tri);
  const half = end.minus(start).times(1 / 2);
  const out = aPerpNorm(tri).times(SIDE_LABEL_OFFSET);
  return start.plus(half).plus(out);
});

export const bMeasurementLabel: Selector<Vec> = memo(tri => {
  const start = bMeasurementStart(tri);
  const end = bMeasurementEnd(tri);
  const half = end.minus(start).times(1 / 2);
  const out = bPerpNorm(tri).times(SIDE_LABEL_OFFSET);
  return start.plus(half).plus(out);
});

export const cMeasurementLabel: Selector<Vec> = memo(tri => {
  const start = cMeasurementStart(tri);
  const end = cMeasurementEnd(tri);
  const half = end.minus(start).times(1 / 2);
  const out = cPerpNorm(tri).times(SIDE_LABEL_OFFSET);
  return start.plus(half).plus(out);
});

export const abAuxSquare: Selector<Vec[]> = memo(tri => [
  tri.v,
  a0(tri),
  abOut(tri),
  b1(tri),
  abIn(tri),
]);

export const cAuxSquare: Selector<Vec[]> = memo(tri => [
  tri.r,
  cAuxV(tri),
  cAuxDiag(tri),
  cAuxH(tri),
]);

export const abMeasurementHOut: Selector<Vec> = memo(tri => {
  const vA0 = a0(tri).minus(tri.v);
  const out = vA0.norm().times(SIDE_MEASURE_OFFSET);
  return vA0.plus(out);
});

export const abMeasurementVOut: Selector<Vec> = memo(tri => {
  const hB1 = b1(tri).minus(tri.h);
  const out = hB1.norm().times(SIDE_MEASURE_OFFSET);
  return hB1.plus(out);
});

export const aSquareMeasurement1Start: Selector<Vec> = memo(tri =>
  tri.v.plus(abMeasurementHOut(tri))
);

export const aSquareMeasurement1End: Selector<Vec> = memo(tri =>
  tri.r.plus(abMeasurementHOut(tri))
);

export const bSquareMeasurement1Start: Selector<Vec> = aSquareMeasurement1End;

export const bSquareMeasurement1End: Selector<Vec> = memo(tri =>
  b0(tri).plus(abMeasurementHOut(tri))
);

export const aSquareMeasurement1Label: Selector<Vec> = memo(tri => {
  const start = aSquareMeasurement1Start(tri);
  const end = aSquareMeasurement1End(tri);
  const half = end.minus(start).times(1 / 2);
  const out = aPerpNorm(tri).times(SIDE_LABEL_OFFSET);
  return start.plus(half).plus(out);
});

export const bSquareMeasurement1Label: Selector<Vec> = memo(tri => {
  const start = bSquareMeasurement1Start(tri);
  const end = bSquareMeasurement1End(tri);
  const half = end.minus(start).times(1 / 2);
  const out = aPerpNorm(tri).times(SIDE_LABEL_OFFSET);
  return start.plus(half).plus(out);
});

export const aSquareMeasurement2Start: Selector<Vec> = memo(tri =>
  a1(tri).plus(abMeasurementVOut(tri))
);

export const aSquareMeasurement2End: Selector<Vec> = memo(tri =>
  tri.r.plus(abMeasurementVOut(tri))
);

export const bSquareMeasurement2Start: Selector<Vec> = aSquareMeasurement2End;

export const bSquareMeasurement2End: Selector<Vec> = memo(tri =>
  tri.h.plus(abMeasurementVOut(tri))
);

export const aSquareMeasurement2Label: Selector<Vec> = memo(tri => {
  const start = aSquareMeasurement2Start(tri);
  const end = aSquareMeasurement2End(tri);
  const half = end.minus(start).times(1 / 2);
  const out = bPerpNorm(tri).times(SIDE_LABEL_OFFSET);
  return start.plus(half).plus(out);
});

export const bSquareMeasurement2Label: Selector<Vec> = memo(tri => {
  const start = bSquareMeasurement2Start(tri);
  const end = bSquareMeasurement2End(tri);
  const half = end.minus(start).times(1 / 2);
  const out = bPerpNorm(tri).times(SIDE_LABEL_OFFSET);
  return start.plus(half).plus(out);
});
