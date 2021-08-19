import React from 'react';
import { StateContext, Selectors as S } from './state';

const Illustration: React.FC = () => {
  const { state } = React.useContext(StateContext);

  const Graphics = S.currentGraphics(state);

  return (
    <article id="illustration">
      <svg id="canvas" xmlns="http://www.w3.org/2000/svg">
        <Graphics />
      </svg>
    </article>
  );
};

export default Illustration;
