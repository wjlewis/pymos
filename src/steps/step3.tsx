import React from 'react';
import * as L from './locations';
import { StepProps } from './index';
import { StateContext, RightTriangle } from '../state';
import { Anim, Extras as AnimExtras } from '../tools';
import ControlPoints from '../ControlPoints';
import MainTriangle from '../MainTriangle';
import Polygon from '../Polygon';

const Section: React.FC = () => {
  return (
    <section>
      <h2>Some Auxiliary Elements</h2>

      <p>
        To start, we construct two larger rectangles around our original right
        triangle: one containing the <code>&ldquo;c&rdquo;</code> square, and
        the other containing the two smaller squares.
      </p>

      <p>
        Curiously enough, both of these &ldquo;auxiliary&rdquo; rectangles
        appear to be squares. Furthermore, no matter our triangle's proportions,
        both appear to have the same area. Is this the case? If so, can you see
        why? We'll look at these questions next.
      </p>
    </section>
  );
};

const Graphics: React.FC<StepProps> = ({ frame }) => {
  const { state } = React.useContext(StateContext);

  const auxSquares = React.useMemo(
    () => animAuxSquares(state.tri),
    [state.tri]
  );

  const { abPath, cPath } = auxSquares.fn(frame);

  return (
    <>
      <Polygon className="main-square" pts={L.aSquare(state.tri)} />
      <Polygon className="main-square" pts={L.bSquare(state.tri)} />
      <Polygon className="main-square" pts={L.cSquare(state.tri)} />
      <MainTriangle />
      <Polygon className="aux-square" d={abPath} opacity={0} />
      <Polygon className="aux-square" d={cPath} opacity={0} />
      <ControlPoints />
    </>
  );
};

function animAuxSquares(tri: RightTriangle): Anim<AuxSquaresState> {
  return Anim.Fork({
    abPath: AnimExtras.SvgPath(L.abAuxSquare(tri), 1600),
    cPath: Anim.Wait('', 1600).then(
      AnimExtras.SvgPath(L.cAuxSquare(tri), 1600)
    ),
  });
}

interface AuxSquaresState {
  abPath: string;
  cPath: string;
}

const step = {
  section: Section,
  graphics: Graphics,
  duration: 3200,
};

export default step;
