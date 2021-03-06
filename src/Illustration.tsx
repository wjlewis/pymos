import React from 'react';
import { StateContext, Actions as A, Selectors as S, Dims } from './state';
import { useDims, useMouse, useAnimationFrame } from './hooks';
import { Vec } from './tools';
import DebugPoints from './DebugPoints';
import MainTriangleReset from './MainTriangleReset';
import Controls from './Controls';

export interface IllustrationProps {
  debug?: boolean;
}

const Illustration: React.FC<IllustrationProps> = props => {
  const { state, dispatch } = React.useContext(StateContext);
  const animControls = useAnimationFrame(S.currentDuration(state), [
    S.stepIndex(state),
  ]);
  const ref = React.useRef<HTMLElement>(null);
  const reportDimsChange = React.useCallback(
    (dims: Dims) => dispatch(A.updateDims(dims)),
    [dispatch]
  );
  const dims = useDims(ref, reportDimsChange);

  const centerX = dims.width / 2;
  const centerY = dims.height / 2;

  useMouse(ref, {
    onMove: pos =>
      dispatch(A.mouseMove(new Vec(pos.x - centerX, pos.y - centerY))),
    onUp: () => dispatch(A.mouseUp()),
  });

  const translation = `translate(${centerX} ${centerY})`;

  const Graphics = S.currentGraphics(state);

  return (
    <article id="illustration">
      <svg id="canvas" ref={ref as any as React.RefObject<SVGSVGElement>}>
        <g transform={`${translation}`}>
          <Graphics frame={animControls.frame} />
          {props.debug && <DebugPoints />}
        </g>
      </svg>
      <Controls {...animControls} />

      <MainTriangleReset />
    </article>
  );
};

export default Illustration;
