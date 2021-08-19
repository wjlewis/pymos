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
}

export enum Device {
  Laptop = 'Laptop',
  Tablet = 'Tablet',
  Phone = 'Phone',
}

export const initState: State = {
  ui: {
    device: Device.Laptop,
  },
  tri: {
    r: new Vec(-70, 0),
    h: new Vec(70, 0),
    v: new Vec(-70, -80),
  },
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
