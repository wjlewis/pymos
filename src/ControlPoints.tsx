import React from 'react';
import { StateContext, Actions as A } from './state';

export const CONTROL_POINT_RADIUS = 8;

const ControlPoints: React.FC = () => {
  const { state, dispatch } = React.useContext(StateContext);

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
        onMouseDown={handleRDown}
      />
      <circle
        className="control-point"
        cx={h.x}
        cy={h.y}
        r={CONTROL_POINT_RADIUS}
        onMouseDown={handleHDown}
      />
      <circle
        className="control-point"
        cx={v.x}
        cy={v.y}
        r={CONTROL_POINT_RADIUS}
        onMouseDown={handleVDown}
      />
    </g>
  );
};

export default ControlPoints;
