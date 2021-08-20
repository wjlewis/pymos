import React from 'react';
import { StateContext, Actions as A, Selectors as S } from './state';

const MainTriangleReset: React.FC = () => {
  const { state, dispatch } = React.useContext(StateContext);

  function handleReset() {
    return dispatch(A.resetMainTriangle());
  }

  if (S.isTriOutOfBounds(state)) {
    return (
      <div id="main-triangle-reset">
        <button onClick={handleReset}>Reset Triangle</button>
      </div>
    );
  } else {
    return null;
  }
};

export default MainTriangleReset;
