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
      <h2>Epilogue: Is this a proof?</h2>

      <p>
        In what sense have we <em>proven</em> that{' '}
        <code>
          a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup>
        </code>{' '}
        ?
      </p>

      <h3>Notes</h3>

      <p>
        I first saw this proof in Paul Lockhart's book <em>Measurement</em>.
        There are simpler mosaic-style proofs of the Pythagorean Theorem, but I
        enjoy the way Lockhart assembled this one.
      </p>

      <p>
        This webpage is written in React (using TypeScript), and I created the
        animations using a small collection of combinators along with a
        special-purpose hook. For more information, see the{' '}
        <a
          href="https://github.com/wjlewis/pymos"
          target="_blank"
          rel="noreferrer"
        >
          source
        </a>
        .
      </p>
    </section>
  );
};

const Graphics: React.FC<StepProps> = ({ frame }) => {
  const { state } = React.useContext(StateContext);

  const angles = React.useMemo(() => animAngles(state.tri), [state.tri]);

  const {
    anglePath,
    angleMeasure1APath,
    angleMeasure1BPath,
    angleMeasure2Path,
    angleMeasure3APath,
    angleMeasure3BPath,
    angleMeasure4Path,
  } = angles.fn(frame);

  return (
    <>
      <Polygon className="main-square dim " pts={L.aSquare(state.tri)} />
      <Polygon className="main-square dim " pts={L.bSquare(state.tri)} />
      <Polygon className="main-square" pts={L.cSquare(state.tri)} />

      <MainTriangle />

      <path className="angle-measure inside" d={angleMeasure1APath} />
      <path className="angle-measure inside" d={angleMeasure1BPath} />

      <path className="angle-measure inside" d={angleMeasure2Path} />

      <path className="angle-measure" d={angleMeasure3APath} />
      <path className="angle-measure" d={angleMeasure3BPath} />

      <path className="angle-measure" d={angleMeasure4Path} />

      <Polygon className="angle-path" d={anglePath} opacity={0} />

      <Polygon
        className="aux-square"
        pts={L.cAuxSquare(state.tri)}
        opacity={0}
      />

      <ControlPoints />
    </>
  );
};

function animAngles(tri: RightTriangle): Anim<AnimAnglesState> {
  const angleMeasure1R = L.hr(tri).length() / 2;
  const angleMeasure2R = L.vr(tri).length() / 2;

  return Anim.Fork({
    anglePath: AnimExtras.SvgPath([tri.h, tri.v, L.c1(tri)], 1200, false),
    angleMeasure1APath: Anim.Wait('', 300).then(
      AnimExtras.SvgArc(tri.h, L.hv(tri), L.hr(tri), angleMeasure1R, 500)
    ),
    angleMeasure1BPath: Anim.Wait('', 300).then(
      AnimExtras.SvgArc(tri.h, L.hv(tri), L.hr(tri), angleMeasure1R - 6, 500)
    ),
    angleMeasure2Path: Anim.Wait('', 600).then(
      AnimExtras.SvgArc(tri.v, L.vh(tri), L.vr(tri), angleMeasure2R, 500)
    ),
    angleMeasure3APath: Anim.Wait('', 1000).then(
      AnimExtras.SvgArc(tri.v, L.vC1(tri), L.vCAuxV(tri), angleMeasure1R, 500)
    ),
    angleMeasure3BPath: Anim.Wait('', 1000).then(
      AnimExtras.SvgArc(
        tri.v,
        L.vC1(tri),
        L.vCAuxV(tri),
        angleMeasure1R - 6,
        500
      )
    ),
    angleMeasure4Path: Anim.Wait('', 1300).then(
      AnimExtras.SvgArc(
        L.c1(tri),
        L.c1V(tri),
        L.c1CAuxV(tri),
        angleMeasure2R,
        500
      )
    ),
  });
}

interface AnimAnglesState {
  anglePath: string;
  angleMeasure1APath: string;
  angleMeasure1BPath: string;
  angleMeasure2Path: string;
  angleMeasure3APath: string;
  angleMeasure3BPath: string;
  angleMeasure4Path: string;
}

const step = {
  section: Section,
  graphics: Graphics,
  duration: 1800,
};

export default step;
