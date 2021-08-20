import React from 'react';
import { StateContext, Actions as A } from './state';

export const CONTROL_POINT_RADIUS = 8;

export interface ControlPointsProps {
  rOpacity?: number;
  hOpacity?: number;
  vOpacity?: number;
}

const ControlPoints: React.FC<ControlPointsProps> = props => {
  const { state, dispatch } = React.useContext(StateContext);
  const { rOpacity = 1, hOpacity = 1, vOpacity = 1 } = props;

  const { r, h, v } = state.tri;

  function handleRDown() {
    return dispatch(A.mouseDownRVertex());
  }

  function handleHDown() {
    return dispatch(A.mouseDownHVertex());
  }

  function handleVDown() {
    return dispatch(A.mouseDownVVertex());
  }

  return (
    <g>
      <circle
        className="control-point"
        cx={r.x}
        cy={r.y}
        r={CONTROL_POINT_RADIUS}
        fillOpacity={rOpacity}
        onMouseDown={handleRDown}
      />
      <circle
        className="control-point"
        cx={h.x}
        cy={h.y}
        r={CONTROL_POINT_RADIUS}
        fillOpacity={hOpacity}
        onMouseDown={handleHDown}
      />
      <circle
        className="control-point"
        cx={v.x}
        cy={v.y}
        r={CONTROL_POINT_RADIUS}
        fillOpacity={vOpacity}
        onMouseDown={handleVDown}
      />
    </g>
  );
};

export default ControlPoints;
