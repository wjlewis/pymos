import React from 'react';
import { StateContext } from './state';

export interface MainTriangleProps {
  d?: string;
  opacity?: number;
  strokeOpacity?: number;
}

const MainTriangle: React.FC<MainTriangleProps> = props => {
  const { state } = React.useContext(StateContext);
  const { r, h, v } = state.tri;

  const fullPath = `M ${r.x} ${r.y} L ${h.x} ${h.y} L ${v.x} ${v.y} Z`;

  const { d = fullPath, opacity = 1, strokeOpacity = 1 } = props;

  return (
    <path
      className="main-triangle"
      d={d}
      fillOpacity={opacity}
      strokeOpacity={strokeOpacity}
    />
  );
};

export default MainTriangle;
