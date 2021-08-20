import React from 'react';
import * as L from './locations';
import { StateContext, RightTriangle } from '../state';
import { useAnimationFrame } from '../hooks';
import { Anim, Extras as AnimExtras } from '../tools';
import Canvas from '../Canvas';
import Controls from '../Controls';
import ControlPoints from '../ControlPoints';
import MainTriangle from '../MainTriangle';
import Polygon from '../Polygon';

const Section: React.FC = () => {
  return (
    <section>
      <h2>Some Auxiliary Elements</h2>

      <p>
        To start, we construct two larger squares around our original right
        triangle: one containing the <code>&ldquo;c&rdquo;</code> square, and
        the other containing the two smaller squares.
      </p>

      <p>
        Curiously enough, both of these &ldquo;auxiliary&rdquo; squares appear
        to have the same area. Is this the case? If so, can you see why? We'll
        look at these questions next.
      </p>
    </section>
  );
};

const Graphics: React.FC = () => {
  const { state } = React.useContext(StateContext);

  const auxSquares = React.useMemo(
    () => animAuxSquares(state.tri),
    [state.tri]
  );

  const animControls = useAnimationFrame(auxSquares.duration);
  const { frame } = animControls;

  const { abPath, cPath } = auxSquares.fn(frame);

  return (
    <>
      <Canvas>
        <Polygon className="main-square" pts={L.aSquare(state.tri)} />
        <Polygon className="main-square" pts={L.bSquare(state.tri)} />
        <Polygon className="main-square" pts={L.cSquare(state.tri)} />
        <MainTriangle />
        <Polygon className="aux-square" d={abPath} />
        <Polygon className="aux-square" d={cPath} />
        <ControlPoints />
      </Canvas>

      <Controls {...animControls} />
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
};

export default step;
