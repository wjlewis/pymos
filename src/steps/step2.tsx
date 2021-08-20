import React from 'react';
import * as L from './locations';
import { StateContext, RightTriangle, Actions as A } from '../state';
import { useAnimationFrame } from '../hooks';
import { Anim, Extras as AnimExtras, Vec } from '../tools';
import ControlPoints from '../ControlPoints';
import MainTriangle from '../MainTriangle';
import Polygon from '../Polygon';

const Section: React.FC = () => {
  const { dispatch } = React.useContext(StateContext);

  function handleThin() {
    return dispatch(A.makeThin());
  }

  function handleEven() {
    return dispatch(A.makeEven());
  }

  return (
    <section>
      <h2>A Slight Reinterpretation</h2>

      <p>
        We'll begin by reinterpreting the statement{' '}
        <code>
          a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup>
        </code>{' '}
        ever so slightly. In particular, we've constructed squares using each of
        the triangle's sides as a base. Since a square whose side length is{' '}
        <code>s</code> has an area of{' '}
        <code>
          s<sup>2</sup>
        </code>
        , our new interpretation of the Pythagorean Theorem states that the two
        smaller squares together have exactly the same area as the larger
        square.
      </p>

      <p>This is what we'll demonstrate in the steps to come.</p>

      <p>
        Is this reasonable? When the triangle is thin, as in this{' '}
        <button onClick={handleThin}>example</button>, the{' '}
        <code>&ldquo;a&rdquo;</code> square is quite small, whereas the{' '}
        <code>&ldquo;b&rdquo;</code> square is just slightly smaller than the{' '}
        <code>&ldquo;c&rdquo;</code> square. As the triangle becomes thinner and
        thinner (try it out!), this behavior is accentuated. For this reason,
        the proposal seems plausible, at least for thin triangles. However, when
        the triangle's sides are{' '}
        <button onClick={handleEven}>roughly even</button>, it may be more
        difficult to tell whether the total area of the smaller squares equals
        that of the larger square.
      </p>
    </section>
  );
};

const Graphics: React.FC = () => {
  const { state } = React.useContext(StateContext);
  const [frame] = useAnimationFrame();

  const squares = React.useMemo(() => animSquares(state.tri), [state.tri]);
  const labels = React.useMemo(() => animLabels(state.tri), [state.tri]);

  const { dA, aOpacity, dB, bOpacity, dC, cOpacity } = squares.fn(frame);
  const { aLabelOpacity, bLabelOpacity, cLabelOpacity } = labels.fn(frame);

  const aLabelPos = L.aSquareLabel(state.tri);
  const bLabelPos = L.bSquareLabel(state.tri);
  const cLabelPos = L.cSquareLabel(state.tri);

  return (
    <g>
      <Polygon className="main-square" d={dA} opacity={aOpacity} />
      <Polygon className="main-square" d={dB} opacity={bOpacity} />
      <Polygon className="main-square" d={dC} opacity={cOpacity} />
      <SquareLabel side="a" pos={aLabelPos} opacity={aLabelOpacity} />
      <SquareLabel side="b" pos={bLabelPos} opacity={bLabelOpacity} />
      <SquareLabel side="c" pos={cLabelPos} opacity={cLabelOpacity} />
      <MainTriangle />
      <ControlPoints />
    </g>
  );
};

interface SquareLabelProps {
  side: string;
  pos: Vec;
  opacity: number;
}

const SquareLabel: React.FC<SquareLabelProps> = props => {
  const { side, pos, opacity } = props;

  return (
    <text
      className="main-square-label"
      x={pos.x}
      y={pos.y}
      fillOpacity={opacity}
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {side}
      <tspan className="main-square-label-exponent" dy="-1ex">
        2
      </tspan>
    </text>
  );
};

function animSquares(tri: RightTriangle): Anim<SquaresState> {
  return Anim.Fork({
    dA: AnimExtras.SvgPath(L.aSquare(tri), 1600),
    aOpacity: Anim.Wait(0, 1600).then(Anim.Ease(0, 1, 600)),
    dB: AnimExtras.SvgPath(L.bSquare(tri), 1600),
    bOpacity: Anim.Wait(0, 1600).then(Anim.Ease(0, 1, 600)),
    dC: AnimExtras.SvgPath(L.cSquare(tri), 1600),
    cOpacity: Anim.Wait(0, 1600).then(Anim.Ease(0, 1, 600)),
  });
}

interface SquaresState {
  dA: string;
  aOpacity: number;
  dB: string;
  bOpacity: number;
  dC: string;
  cOpacity: number;
}

function animLabels(tri: RightTriangle): Anim<LabelsState> {
  return Anim.Fork({
    aLabelOpacity: Anim.Wait(0, 2400).then(Anim.Ease(0, 1, 600)),
    bLabelOpacity: Anim.Wait(0, 3000).then(Anim.Ease(0, 1, 600)),
    cLabelOpacity: Anim.Wait(0, 3600).then(Anim.Ease(0, 1, 600)),
  });
}

interface LabelsState {
  aLabelOpacity: number;
  bLabelOpacity: number;
  cLabelOpacity: number;
}

const step = {
  section: Section,
  graphics: Graphics,
};

export default step;
