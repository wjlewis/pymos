import { State } from './state';
import { Action, ActionType } from './actions';
import { steps } from '../steps';
import { DragSubject } from './DragSubject';
import { Vec, sign } from '../tools';

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.PreviousStep:
      return reducePreviousStep(state);
    case ActionType.NextStep:
      return reduceNextStep(state);
    case ActionType.MouseDownRVertex:
      return reduceMouseDownRVertex(state);
    case ActionType.MouseDownHVertex:
      return reduceMouseDownHVertex(state);
    case ActionType.MouseDownVVertex:
      return reduceMouseDownVVertex(state);
    case ActionType.MouseMove:
      return reduceMouseMove(state, action.payload);
    case ActionType.MouseUp:
      return reduceMouseUp(state);
    default:
      return state;
  }
}

function reducePreviousStep(state: State): State {
  return { ...state, stepIndex: Math.max(0, state.stepIndex - 1) };
}

function reduceNextStep(state: State): State {
  return {
    ...state,
    stepIndex: Math.min(steps.length - 1, state.stepIndex + 1),
  };
}

function reduceMouseDownRVertex(state: State): State {
  const { r, h, v } = state.tri;
  const hOffset = h.x - r.x;
  const vOffset = v.y - r.y;

  return { ...state, dragSubject: DragSubject.RVertex(hOffset, vOffset) };
}

function reduceMouseDownHVertex(state: State): State {
  return { ...state, dragSubject: DragSubject.HVertex() };
}

function reduceMouseDownVVertex(state: State): State {
  return { ...state, dragSubject: DragSubject.VVertex() };
}

function reduceMouseMove(state: State, mousePos: Vec): State {
  return state.dragSubject.match({
    none: () => state,
    r: (hOffset, vOffset) => moveRVertex(state, hOffset, vOffset, mousePos),
    h: () => moveHVertex(state, mousePos),
    v: () => moveVVertex(state, mousePos),
  });
}

function moveRVertex(
  state: State,
  hOffset: number,
  vOffset: number,
  mousePos: Vec
): State {
  const h = new Vec(mousePos.x + hOffset, mousePos.y);
  const v = new Vec(mousePos.x, mousePos.y + vOffset);
  return { ...state, tri: { r: mousePos, h, v } };
}

const VERTEX_PADDING = 40;

function moveHVertex(state: State, mousePos: Vec): State {
  const { r, v } = state.tri;

  const hX =
    Math.abs(mousePos.x - r.x) < VERTEX_PADDING
      ? r.x + VERTEX_PADDING * sign(mousePos.x - r.x)
      : mousePos.x;
  const hY =
    Math.abs(mousePos.y - v.y) < VERTEX_PADDING
      ? v.y + VERTEX_PADDING * sign(mousePos.y - v.y)
      : mousePos.y;

  const newH = new Vec(hX, hY);
  const newR = new Vec(r.x, hY);

  return { ...state, tri: { ...state.tri, r: newR, h: newH } };
}

function moveVVertex(state: State, mousePos: Vec): State {
  const { r, h } = state.tri;

  const vX =
    Math.abs(mousePos.x - h.x) < VERTEX_PADDING
      ? h.x + VERTEX_PADDING * sign(mousePos.x - h.x)
      : mousePos.x;
  const vY =
    Math.abs(mousePos.y - r.y) < VERTEX_PADDING
      ? r.y + VERTEX_PADDING * sign(mousePos.y - r.y)
      : mousePos.y;

  const newV = new Vec(vX, vY);
  const newR = new Vec(vX, r.y);

  return { ...state, tri: { ...state.tri, r: newR, v: newV } };
}

function reduceMouseUp(state: State): State {
  return { ...state, dragSubject: DragSubject.None() };
}
