import React from 'react';
import { StateContext, Selectors as S } from './state';
import MainTriangleReset from './MainTriangleReset';

const Illustration: React.FC = () => {
  const { state } = React.useContext(StateContext);

  const Graphics = S.currentGraphics(state);

  return (
    <article id="illustration">
      <Graphics />
      <MainTriangleReset />
    </article>
  );
};

export default Illustration;
