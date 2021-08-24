import { Vec, Pose, memo } from '../tools';
import { RightTriangle } from '../state';

interface Selector<A> {
  (tri: RightTriangle): A;
}

export const vr: Selector<Vec> = memo(tri => tri.r.minus(tri.v));

export const hr: Selector<Vec> = memo(tri => tri.r.minus(tri.h));

export const vh: Selector<Vec> = memo(tri => tri.h.minus(tri.v));

export const rv: Selector<Vec> = memo(tri => vr(tri).times(-1));

export const rh: Selector<Vec> = memo(tri => hr(tri).times(-1));

export const hv: Selector<Vec> = memo(tri => vh(tri).times(-1));

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

export const isRightHanded: Selector<boolean> = memo(
  tri => rh(tri).cross(rv(tri)) >= 0
);

export const initTriPose: Selector<Pose> = memo(tri => new Pose(tri.r, 0));

export const triCopyPts: Selector<Vec[]> = memo(tri => [
  new Vec(0, 0),
  rh(tri),
  rv(tri),
]);

export const triCopyC1Pose: Selector<Pose> = memo(tri => {
  const angle = isRightHanded(tri) ? -Math.PI / 2 : Math.PI / 2;
  return new Pose(cAuxV(tri), angle);
});

export const triCopyC2Pose: Selector<Pose> = memo(
  tri => new Pose(cAuxDiag(tri), Math.PI)
);

export const triCopyC3Pose: Selector<Pose> = memo(tri => {
  const angle = isRightHanded(tri) ? (-3 * Math.PI) / 2 : (3 * Math.PI) / 2;
  return new Pose(cAuxH(tri), angle);
});

export const triCopyAB1Pose: Selector<Pose> = memo(
  tri => new Pose(abIn(tri), Math.PI)
);

export const triCopyAB2Pose: Selector<Pose> = memo(tri => {
  const angle = isRightHanded(tri) ? -Math.PI / 2 : Math.PI / 2;
  return new Pose(a1(tri), angle);
});

export const triCopyAB3Pose: Selector<Pose> = memo(tri => {
  const angle = isRightHanded(tri) ? Math.PI / 2 : -Math.PI / 2;
  return new Pose(b0(tri), angle);
});

export const cMeasurementVOut: Selector<Vec> = memo(tri =>
  rv(tri).norm().times(SIDE_MEASURE_OFFSET)
);

export const cMeasurementHOut: Selector<Vec> = memo(tri =>
  rh(tri).norm().times(SIDE_MEASURE_OFFSET)
);

export const cSquareMeasurementA1Start: Selector<Vec> = memo(tri =>
  cAuxV(tri).plus(cMeasurementVOut(tri))
);

export const cSquareMeasurementA1End: Selector<Vec> = memo(tri =>
  c1(tri).plus(cMeasurementVOut(tri))
);

export const cSquareMeasurementB1Start: Selector<Vec> = cSquareMeasurementA1End;

export const cSquareMeasurementB1End: Selector<Vec> = memo(tri =>
  cAuxDiag(tri).plus(cMeasurementVOut(tri))
);

export const cSquareMeasurementA1Label: Selector<Vec> = memo(tri => {
  const start = cSquareMeasurementA1Start(tri);
  const end = cSquareMeasurementA1End(tri);
  const half = end.minus(start).times(1 / 2);
  const out = bPerpNorm(tri).times(-SIDE_LABEL_OFFSET);
  return start.plus(half).plus(out);
});

export const cSquareMeasurementB1Label: Selector<Vec> = memo(tri => {
  const start = cSquareMeasurementB1Start(tri);
  const end = cSquareMeasurementB1End(tri);
  const half = end.minus(start).times(1 / 2);
  const out = bPerpNorm(tri).times(-SIDE_LABEL_OFFSET);
  return start.plus(half).plus(out);
});

export const cSquareMeasurementA2Start: Selector<Vec> = memo(tri =>
  cAuxDiag(tri).plus(cMeasurementHOut(tri))
);

export const cSquareMeasurementA2End: Selector<Vec> = memo(tri =>
  c0(tri).plus(cMeasurementHOut(tri))
);

export const cSquareMeasurementB2Start: Selector<Vec> = cSquareMeasurementA2End;

export const cSquareMeasurementB2End: Selector<Vec> = memo(tri =>
  cAuxH(tri).plus(cMeasurementHOut(tri))
);

export const cSquareMeasurementA2Label: Selector<Vec> = memo(tri => {
  const start = cSquareMeasurementA2Start(tri);
  const end = cSquareMeasurementA2End(tri);
  const half = end.minus(start).times(1 / 2);
  const out = aPerpNorm(tri).times(-SIDE_LABEL_OFFSET);
  return start.plus(half).plus(out);
});

export const cSquareMeasurementB2Label: Selector<Vec> = memo(tri => {
  const start = cSquareMeasurementB2Start(tri);
  const end = cSquareMeasurementB2End(tri);
  const half = end.minus(start).times(1 / 2);
  const out = aPerpNorm(tri).times(-SIDE_LABEL_OFFSET);
  return start.plus(half).plus(out);
});

export const triCopyLabelOut: Selector<Vec> = memo(tri => {
  const vert = rv(tri).times(0.33);
  const horiz = rh(tri).times(0.33);
  return horiz.plus(vert);
});

export const mainTriLabel: Selector<Vec> = memo(tri => {
  return tri.r.plus(triCopyLabelOut(tri));
});

export const triCopyC1Label: Selector<Vec> = memo(tri => {
  const angle = isRightHanded(tri) ? (3 * Math.PI) / 2 : Math.PI / 2;
  return cAuxV(tri).plus(triCopyLabelOut(tri).rotate(angle));
});

export const triCopyC2Label: Selector<Vec> = memo(tri => {
  return cAuxDiag(tri).plus(triCopyLabelOut(tri).rotate(Math.PI));
});

export const triCopyC3Label: Selector<Vec> = memo(tri => {
  const angle = isRightHanded(tri) ? Math.PI / 2 : (3 * Math.PI) / 2;
  return cAuxH(tri).plus(triCopyLabelOut(tri).rotate(angle));
});

export const triCopyAB1Label: Selector<Vec> = memo(tri => {
  return abIn(tri).plus(triCopyLabelOut(tri).rotate(Math.PI));
});

export const triCopyAB2Label: Selector<Vec> = memo(tri => {
  const angle = isRightHanded(tri) ? -Math.PI / 2 : Math.PI / 2;
  return a1(tri).plus(triCopyLabelOut(tri).rotate(angle));
});

export const triCopyAB3Label: Selector<Vec> = memo(tri => {
  const angle = isRightHanded(tri) ? Math.PI / 2 : -Math.PI / 2;
  return b0(tri).plus(triCopyLabelOut(tri).rotate(angle));
});

export const vC1: Selector<Vec> = memo(tri => c1(tri).minus(tri.v));

export const vCAuxV: Selector<Vec> = memo(tri => cAuxV(tri).minus(tri.v));

export const c1V: Selector<Vec> = memo(tri => vC1(tri).times(-1));

export const c1CAuxV: Selector<Vec> = memo(tri => cAuxV(tri).minus(c1(tri)));
