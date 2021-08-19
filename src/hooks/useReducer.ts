import React from 'react';

export function useReducer<St, A>(
  reducer: React.Reducer<St, A>,
  init: St,
  ...middlewares: Middleware<St, A>[]
): [St, React.Dispatch<A>] {
  let [state, dispatch] = React.useReducer(reducer, init);

  const middlewares1 = [...middlewares];
  middlewares1.reverse();
  middlewares1.forEach(middleware => {
    dispatch = middleware(state, dispatch);
  });

  return [state, dispatch];
}

export interface Middleware<St, A> {
  (state: St, dispatch: React.Dispatch<A>): React.Dispatch<A>;
}
