import { State } from '../state';
import { Action } from '../actions';

export interface Middleware<St, A> {
  (state: St, dispatch: React.Dispatch<A>): React.Dispatch<A>;
}

export function logActions(...noLog: string[]): Middleware<State, Action> {
  return (state, dispatch) => {
    return action => {
      if (!noLog.includes(action.type)) {
        console.log(JSON.stringify(action, null, 2));
      }

      return dispatch(action);
    };
  };
}
