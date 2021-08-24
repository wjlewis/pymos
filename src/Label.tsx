import React from 'react';
import { Vec } from './tools';

interface LabelProps {
  name: string;
  pos: Vec;
  opacity: number;
  className?: string;
}

const Label: React.FC<LabelProps> = props => {
  const { name, pos, opacity, className } = props;
  return (
    <text
      className={className}
      x={pos.x}
      y={pos.y}
      fillOpacity={opacity}
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {name}
    </text>
  );
};

export default Label;
