import { Vec, memo } from '../tools';
import { RightTriangle } from '../state';

interface VecSelector {
  (tri: RightTriangle): Vec;
}

export const vr: VecSelector = memo(tri => tri.r.minus(tri.v));

export const hr: VecSelector = memo(tri => tri.r.minus(tri.h));

export const vh: VecSelector = memo(tri => tri.h.minus(tri.v));

export const rv: VecSelector = memo(tri => vr(tri).times(-1));

export const rh: VecSelector = memo(tri => hr(tri).times(-1));

export const aPerpNorm: VecSelector = memo(tri => {
  return hr(tri).norm();
});

export const aPerp: VecSelector = memo(tri => {
  const length = vr(tri).length();
  return aPerpNorm(tri).times(length);
});

export const a0: VecSelector = memo(tri => {
  return tri.v.plus(aPerp(tri));
});

export const a1: VecSelector = memo(tri => {
  return tri.r.plus(aPerp(tri));
});

export const bPerpNorm: VecSelector = memo(tri => {
  return vr(tri).norm();
});

export const bPerp: VecSelector = memo(tri => {
  const length = hr(tri).length();
  return bPerpNorm(tri).times(length);
});

export const b0: VecSelector = memo(tri => {
  return tri.r.plus(bPerp(tri));
});

export const b1: VecSelector = memo(tri => {
  return tri.h.plus(bPerp(tri));
});

export const cPerpNorm: VecSelector = memo(tri => {
  const vh1 = vh(tri);
  const vr1 = vr(tri);
  const proj = vr1.proj(vh1);
  return proj.minus(vr1).norm();
});

export const cPerp: VecSelector = memo(tri => {
  const length = vh(tri).length();
  return cPerpNorm(tri).times(length);
});

export const c0: VecSelector = memo(tri => {
  return tri.h.plus(cPerp(tri));
});

export const c1: VecSelector = memo(tri => {
  return tri.v.plus(cPerp(tri));
});

export const abOut: VecSelector = memo(tri => {
  return b0(tri).plus(aPerp(tri));
});

export const abIn: VecSelector = memo(tri => {
  return tri.h.plus(rv(tri));
});

export const cAuxV: VecSelector = memo(tri => {
  const hrLength = hr(tri).length();
  const vert = rv(tri).norm().times(hrLength);
  return tri.v.plus(vert);
});

export const cAuxDiag: VecSelector = memo(tri => {
  const rh1 = rh(tri);
  const length = rh1.length() + vr(tri).length();
  const out = rh1.norm().times(length);
  return cAuxV(tri).plus(out);
});

export const cAuxH: VecSelector = memo(tri => {
  const vrLength = vr(tri).length();
  const horiz = rh(tri).norm().times(vrLength);
  return tri.h.plus(horiz);
});

const SIDE_MEASURE_OFFSET = 30;

export const aMeasurementPerp: VecSelector = memo(tri =>
  aPerpNorm(tri).times(SIDE_MEASURE_OFFSET)
);

export const aMeasurementStart: VecSelector = memo(tri =>
  tri.v.plus(aMeasurementPerp(tri))
);

export const aMeasurementEnd: VecSelector = memo(tri =>
  tri.r.plus(aMeasurementPerp(tri))
);

export const bMeasurementPerp: VecSelector = memo(tri =>
  bPerpNorm(tri).times(SIDE_MEASURE_OFFSET)
);

export const bMeasurementStart: VecSelector = memo(tri =>
  tri.r.plus(bMeasurementPerp(tri))
);

export const bMeasurementEnd: VecSelector = memo(tri =>
  tri.h.plus(bMeasurementPerp(tri))
);

export const cMeasurementPerp: VecSelector = memo(tri =>
  cPerpNorm(tri).times(SIDE_MEASURE_OFFSET)
);

export const cMeasurementStart: VecSelector = memo(tri =>
  tri.h.plus(cMeasurementPerp(tri))
);

export const cMeasurementEnd: VecSelector = memo(tri =>
  tri.v.plus(cMeasurementPerp(tri))
);

const SIDE_LABEL_OFFSET = 20;

export const aMeasurementLabel: VecSelector = memo(tri => {
  const start = aMeasurementStart(tri);
  const end = aMeasurementEnd(tri);
  const half = end.minus(start).times(1 / 2);
  const out = aPerpNorm(tri).times(SIDE_LABEL_OFFSET);
  return start.plus(half).plus(out);
});

export const bMeasurementLabel: VecSelector = memo(tri => {
  const start = bMeasurementStart(tri);
  const end = bMeasurementEnd(tri);
  const half = end.minus(start).times(1 / 2);
  const out = bPerpNorm(tri).times(SIDE_LABEL_OFFSET);
  return start.plus(half).plus(out);
});

export const cMeasurementLabel: VecSelector = memo(tri => {
  const start = cMeasurementStart(tri);
  const end = cMeasurementEnd(tri);
  const half = end.minus(start).times(1 / 2);
  const out = cPerpNorm(tri).times(SIDE_LABEL_OFFSET);
  return start.plus(half).plus(out);
});
