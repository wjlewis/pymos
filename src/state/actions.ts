import { Vec } from '../tools';

export interface Action {
  type: string;
  payload?: any;
}

export enum ActionType {
  PreviousStep = 'PreviousStep',
  NextStep = 'NextStep',
  MouseDownRVertex = 'MouseDownRVertex',
  MouseDownHVertex = 'MouseDownHVertex',
  MouseDownVVertex = 'MouseDownVVertex',
  MouseMove = 'MouseMove',
  MouseUp = 'MouseUp',
  UpdateFrame = 'UpdateFrame',
  MakeThin = 'MakeThin',
  MakeEven = 'MakeEven',
}

export function previousStep(): Action {
  return { type: ActionType.PreviousStep };
}

export function nextStep(): Action {
  return { type: ActionType.NextStep };
}

export function mouseDownRVertex(): Action {
  return { type: ActionType.MouseDownRVertex };
}

export function mouseDownHVertex(): Action {
  return { type: ActionType.MouseDownHVertex };
}

export function mouseDownVVertex(): Action {
  return { type: ActionType.MouseDownVVertex };
}

export function mouseMove(pos: Vec): Action {
  return { type: ActionType.MouseMove, payload: pos };
}

export function mouseUp(): Action {
  return { type: ActionType.MouseUp };
}

export function updateFrame(
  frame: number,
  rafHandle: undefined | number
): Action {
  return { type: ActionType.UpdateFrame, payload: { frame, rafHandle } };
}

export function makeThin(): Action {
  return { type: ActionType.MakeThin };
}

export function makeEven(): Action {
  return { type: ActionType.MakeEven };
}
