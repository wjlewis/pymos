import React from 'react';
import { StateContext, Actions as A, Selectors as S } from './state';
import { useDims, useMouse } from './hooks';
import { Vec } from './tools';
import DebugPoints from './DebugPoints';

export interface IllustrationProps {
  debug?: boolean;
}

const Illustration: React.FC<IllustrationProps> = props => {
  const { state, dispatch } = React.useContext(StateContext);
  const ref = React.useRef<HTMLElement>(null);
  const dims = useDims(ref);

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
      <svg
        id="canvas"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref as any as React.RefObject<SVGSVGElement>}
      >
        <g transform={`${translation}`}>
          <Graphics />
          {props.debug && <DebugPoints />}
        </g>
      </svg>
    </article>
  );
};

export default Illustration;
