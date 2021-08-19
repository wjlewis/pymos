export interface Action {
  type: string;
  payload?: any;
}

export enum ActionType {
  PreviousStep = 'PreviousStep',
  NextStep = 'NextStep',
}

export function previousStep(): Action {
  return { type: ActionType.PreviousStep };
}

export function nextStep(): Action {
  return { type: ActionType.NextStep };
}
