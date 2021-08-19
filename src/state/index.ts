import React from 'react';
import { initState } from './state';
import { Action } from './actions';

export * from './state';
export * from './reducer';
export * as Actions from './actions';
export * as Selectors from './selectors';
export * from './middleware';

export const StateContext = React.createContext({
  state: initState,
  dispatch: null as any as React.Dispatch<Action>,
});
