import { Vec, memo } from '../tools';
import { RightTriangle } from '../state';

interface VecSelector {
  (tri: RightTriangle): Vec;
}

export const rv: VecSelector = memo(tri => tri.v.minus(tri.r));

export const rh: VecSelector = memo(tri => tri.h.minus(tri.r));

export const vh: VecSelector = memo(tri => tri.h.minus(tri.v));

export const aPerp: VecSelector = memo(tri => {
  const length = rv(tri).length();
  return rh(tri).norm().times(-length);
});

export const a0: VecSelector = memo(tri => {
  return tri.v.plus(aPerp(tri));
});

export const a1: VecSelector = memo(tri => {
  return tri.r.plus(aPerp(tri));
});

export const bPerp: VecSelector = memo(tri => {
  const length = rh(tri).length();
  return rv(tri).norm().times(-length);
});

export const b0: VecSelector = memo(tri => {
  return tri.r.plus(bPerp(tri));
});

export const b1: VecSelector = memo(tri => {
  return tri.h.plus(bPerp(tri));
});

const cPerp: VecSelector = memo(tri => {
  const vh1 = vh(tri);
  const length = vh1.length();
  const vr = rv(tri).times(-1);
  const proj = vr.proj(vh1);
  return proj.minus(vr).norm().times(length);
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
  const rhLength = rh(tri).length();
  const vert = rv(tri).norm().times(rhLength);
  return tri.v.plus(vert);
});

export const cAuxDiag: VecSelector = memo(tri => {
  const rh1 = rh(tri);
  const length = rh1.length() + rv(tri).length();
  const out = rh1.norm().times(length);
  return cAuxV(tri).plus(out);
});

export const cAuxH: VecSelector = memo(tri => {
  const rvLength = rv(tri).length();
  const horiz = rh(tri).norm().times(rvLength);
  return tri.h.plus(horiz);
});
