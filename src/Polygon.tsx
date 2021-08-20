import React from 'react';
import { Vec } from './tools';

export interface PolygonProps {
  pts?: Vec[];
  className?: string;
  d?: string;
  opacity?: number;
}

const Polygon: React.FC<PolygonProps> = props => {
  const { pts = [], className, opacity = 1 } = props;

  const d = props.d
    ? props.d
    : `M ${pts.map(pt => `${pt.x} ${pt.y}`).join(' L ')} Z`;

  return <path className={className} d={d} fillOpacity={opacity} />;
};

export default Polygon;
