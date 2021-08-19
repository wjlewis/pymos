import React from 'react';
import { StateContext, Selectors as S } from './state';

const Prose: React.FC = () => {
  const { state } = React.useContext(StateContext);

  const Section = S.currentSection(state);

  return (
    <article id="prose">
      <Section />
    </article>
  );
};

export default Prose;
