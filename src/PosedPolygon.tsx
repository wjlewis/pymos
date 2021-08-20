import React from 'react';
import { Vec, Pose } from './tools';

export interface PosedPolygonProps {
  // These are the coordinates of the polygon's points in _object space_
  pts: Vec[];
  // This is the location and orientation of the polygon in _world space_
  pose: Pose;
  opacity?: number;
  className?: string;
}

const PosedPolygon: React.FC<PosedPolygonProps> = props => {
  const { pose, opacity = 1, className } = props;

  const pts = props.pts.map(pt => pt.rotate(pose.angle).plus(pose.loc));
  const d = `M ${pts.map(pt => `${pt.x} ${pt.y}`).join(' L ')} Z`;

  return <path className={className} d={d} fillOpacity={opacity} />;
};

export default PosedPolygon;
