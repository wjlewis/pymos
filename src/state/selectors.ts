import { State } from './state';
import { steps } from '../steps';

export function canGoPrevious(state: State): boolean {
  return state.stepIndex > 0;
}

export function canGoNext(state: State): boolean {
  return state.stepIndex < steps.length - 1;
}

export function stepProgress(state: State): string {
  return `${state.stepIndex + 1} / ${steps.length}`;
}

export function currentSection(state: State): React.FC {
  return steps[state.stepIndex].section;
}

export function currentGraphics(state: State): React.FC {
  return steps[state.stepIndex].graphics;
}
