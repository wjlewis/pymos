import React from 'react';
import { Vec } from './tools';

interface SquareLabelProps {
  side: string;
  pos: Vec;
  opacity: number;
}

const SquareLabel: React.FC<SquareLabelProps> = props => {
  const { side, pos, opacity } = props;

  return (
    <text
      className="main-square-label"
      x={pos.x}
      y={pos.y}
      fillOpacity={opacity}
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {side}
      <tspan className="main-square-label-exponent" dy="-1ex">
        2
      </tspan>
    </text>
  );
};

export default SquareLabel;
