export interface State {
  ui: UIState;
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
  stepIndex: 0,
};
