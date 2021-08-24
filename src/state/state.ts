import { DragSubject } from './DragSubject';
import { Vec } from '../tools';

export interface State {
  ui: UIState;
  tri: RightTriangle;
  dragSubject: DragSubject;
  stepIndex: number;
}

export interface UIState {
  device: Device;
  dims: Dims;
  triOutOfBounds: boolean;
  theme: Theme;
}

export enum Device {
  Laptop = 'Laptop',
  Mobile = 'Mobile',
}

export enum Theme {
  Light = 'Light',
  Dark = 'Dark',
}

export const initTri: RightTriangle = {
  r: new Vec(-70, 0),
  h: new Vec(70, 0),
  v: new Vec(-70, -80),
};

export const smallInitTri: RightTriangle = {
  r: new Vec(-25, 20),
  h: new Vec(25, 20),
  v: new Vec(-25, -20),
};

export const initState: State = {
  ui: {
    dims: { width: 0, height: 0 },
    triOutOfBounds: false,
    device: Device.Laptop,
    theme: Theme.Light,
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
