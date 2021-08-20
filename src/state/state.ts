import { DragSubject } from './DragSubject';
import { Vec } from '../tools';

export interface State {
  ui: UIState;
  tri: RightTriangle;
  dragSubject: DragSubject;
  stepIndex: number;
}

export interface UIState {
  dims: Dims;
  triOutOfBounds: boolean;
}

export const initTri: RightTriangle = {
  r: new Vec(-70, 0),
  h: new Vec(70, 0),
  v: new Vec(-70, -80),
};

export const initState: State = {
  ui: {
    dims: { width: 0, height: 0 },
    triOutOfBounds: false,
  },
  tri: initTri,
  dragSubject: DragSubject.None(),
  stepIndex: 0,
};

// v -> *
//      |\
//      | \
// r -> *--* <- h
export interface RightTriangle {
  r: Vec;
  h: Vec;
  v: Vec;
}

export interface Dims {
  width: number;
  height: number;
}
