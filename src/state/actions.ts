import { Vec } from '../tools';
import { Dims } from './state';

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
  MakeThin = 'MakeThin',
  MakeEven = 'MakeEven',
  UpdateDims = 'UpdateDims',
  ResetMainTriangle = 'ResetMainTriangle',
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

export function makeThin(): Action {
  return { type: ActionType.MakeThin };
}

export function makeEven(): Action {
  return { type: ActionType.MakeEven };
}

export function updateDims(dims: Dims): Action {
  return { type: ActionType.UpdateDims, payload: dims };
}

export function resetMainTriangle(): Action {
  return { type: ActionType.ResetMainTriangle };
}
