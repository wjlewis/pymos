import React from 'react';
import { StateContext, Selectors as S, Actions as A } from './state';

const Footer: React.FC = () => {
  const { state, dispatch } = React.useContext(StateContext);

  const noPrevious = !S.canGoPrevious(state);
  const noNext = !S.canGoNext(state);

  function handlePrevious() {
    return dispatch(A.previousStep());
  }

  function handleNext() {
    return dispatch(A.nextStep());
  }

  return (
    <footer>
      <nav>
        <button
          onClick={handlePrevious}
          style={{ visibility: noPrevious ? 'hidden' : 'initial' }}
        >
          Previous
        </button>

        <span>{S.stepProgress(state)}</span>

        <button
          onClick={handleNext}
          style={{ visibility: noNext ? 'hidden' : 'initial' }}
        >
          Next
        </button>
      </nav>
    </footer>
  );
};

export default Footer;
