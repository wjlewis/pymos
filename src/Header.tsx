import React from 'react';
import sonobe from './assets/sonobe.svg';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <a href="https://wjlewis.github.io" target="_blank" rel="noreferrer">
          <img id="icon" src={sonobe} alt="A sonobe module" />
        </a>

        <a
          href="https://www.github.com/wjlewis/pymos"
          target="_blank"
          rel="noreferrer"
        >
          Source
        </a>
      </nav>
    </header>
  );
};

export default Header;
