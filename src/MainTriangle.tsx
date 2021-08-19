import React from 'react';
import { StateContext } from './state';

const MainTriangle: React.FC = () => {
  const { state } = React.useContext(StateContext);
  const { r, h, v } = state.tri;

  return (
    <path
      className="main-triangle"
      d={`M ${r.x} ${r.y} L ${h.x} ${h.y} L ${v.x} ${v.y} Z`}
    />
  );
};

export default MainTriangle;
