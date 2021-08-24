import React from 'react';
import { StateContext, Actions as A, Selectors as S } from './state';
import sonobe from './assets/sonobe.svg';

const Header: React.FC = () => {
  const { state, dispatch } = React.useContext(StateContext);

  function handleClick() {
    return dispatch(A.toggleTheme());
  }

  return (
    <header>
      <nav>
        <a href="https://wjlewis.github.io" target="_blank" rel="noreferrer">
          <img id="icon" src={sonobe} alt="A sonobe module" />
        </a>

        <div>
          <button className="theme-toggle" onClick={handleClick}>
            {S.altThemeString(state)}
          </button>

          <a
            href="https://www.github.com/wjlewis/pymos"
            target="_blank"
            rel="noreferrer"
          >
            Source
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
