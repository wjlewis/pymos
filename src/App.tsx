import React from 'react';
import {
  StateContext,
  initState,
  reducer,
  logActions,
  Actions as A,
} from './state';
import { useReducer } from './hooks';
import Header from './Header';
import Prose from './Prose';
import Illustration from './Illustration';
import Footer from './Footer';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(
    reducer,
    initState,
    logActions(A.ActionType.MouseMove)
  );

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <Header />
      <main>
        <Prose />
        <Illustration />
      </main>
      <Footer />
    </StateContext.Provider>
  );
};

export default App;
