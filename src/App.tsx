import React from 'react';
import {
  StateContext,
  initState,
  reducer,
  Actions as A,
  Selectors as S,
} from './state';
import { useDevice } from './hooks';
import Header from './Header';
import Prose from './Prose';
import Illustration from './Illustration';
import Footer from './Footer';

const App: React.FC = () => {
  const [state, dispatch] = React.useReducer(reducer, initState);
  useDevice(device => dispatch(A.updateDevice(device)));

  return (
    <main className={S.isLight(state) ? 'light' : 'dark'}>
      <StateContext.Provider value={{ state, dispatch }}>
        <Header />
        <article id="content">
          <Prose />
          <Illustration />
        </article>
        <Footer />
      </StateContext.Provider>
    </main>
  );
};

export default App;
