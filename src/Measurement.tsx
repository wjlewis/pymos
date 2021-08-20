import React from 'react';
import { Vec } from './tools';

export interface MeasurementProps {
  d: string;
  label: string;
  labelPos: Vec;
  labelOpacity: number;
}

const Measurement: React.FC<MeasurementProps> = props => {
  const { d, label, labelPos, labelOpacity } = props;

  return (
    <g>
      <path className="measurement-path" d={d} />
      <text
        className="measurement-label"
        x={labelPos.x}
        y={labelPos.y}
        fillOpacity={labelOpacity}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {label}
      </text>
    </g>
  );
};

export default Measurement;
