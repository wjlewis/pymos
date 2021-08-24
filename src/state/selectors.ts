import { State, Dims, Theme } from './state';
import { StepProps, steps } from '../steps';

export function canGoPrevious(state: State): boolean {
  return state.stepIndex > 0;
}

export function canGoNext(state: State): boolean {
  return state.stepIndex < steps.length - 1;
}

export function stepProgress(state: State): string {
  return `${state.stepIndex + 1} / ${steps.length}`;
}

export function stepIndex(state: State): number {
  return state.stepIndex;
}

export function currentSection(state: State): React.FC {
  return steps[state.stepIndex].section;
}

export function currentGraphics(state: State): React.FC<StepProps> {
  return steps[state.stepIndex].graphics;
}

export function isTriOutOfBounds(state: State): boolean {
  return state.ui.triOutOfBounds;
}

export function dims(state: State): Dims {
  return state.ui.dims;
}

export function currentDuration(state: State): number {
  return steps[state.stepIndex].duration;
}

export function isLight(state: State): boolean {
  return state.ui.theme === Theme.Light;
}

export function altThemeString(state: State): string {
  return state.ui.theme === Theme.Light ? 'Dark' : 'Light';
}
