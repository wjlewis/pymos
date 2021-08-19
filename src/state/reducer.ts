import { State } from './state';
import { Action, ActionType } from './actions';
import { steps } from '../steps';

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.PreviousStep:
      return reducePreviousStep(state);
    case ActionType.NextStep:
      return reduceNextStep(state);
    default:
      return state;
  }
}

function reducePreviousStep(state: State): State {
  return {
    ...state,
    stepIndex: Math.max(0, state.stepIndex - 1),
  };
}

function reduceNextStep(state: State): State {
  return {
    ...state,
    stepIndex: Math.min(steps.length - 1, state.stepIndex + 1),
  };
}
