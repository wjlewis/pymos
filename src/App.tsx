import React from 'react';
import { StateContext, initState, reducer } from './state';
import Header from './Header';
import Prose from './Prose';
import Illustration from './Illustration';
import Footer from './Footer';

const App: React.FC = () => {
  const [state, dispatch] = React.useReducer(reducer, initState);

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
