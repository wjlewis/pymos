import React from 'react';
import * as L from './locations';
import { StepProps } from './index';
import { StateContext, RightTriangle } from '../state';
import { Anim, Extras as AnimExtras } from '../tools';
import ControlPoints from '../ControlPoints';
import MainTriangle from '../MainTriangle';
import Measurement from '../Measurement';

const Section: React.FC = () => {
  return (
    <section>
      <h1>A Pythagorean Mosaic</h1>

      <p>
        The celebrated <em>Pythagorean Theorem</em> says that the relationship
        between the lengths of the sides of any right triangle is astonishingly
        simple: specifically, the square of the length of the longest side (the
        &ldquo;hypotenuse&rdquo;) is equal to the sum of the squares of the
        shorter sides. Following convention, if we call the length of the
        hypotenuse <code>c</code>, and the lengths of the remaining sides{' '}
        <code>a</code> and <code>b</code>, the Pythagorean Theorem states that{' '}
        <code>
          a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup>
        </code>
        .
      </p>
      <p>
        How do we <em>know</em> that this is true? Perhaps we could (somehow)
        check a large collection of right triangles to see if this is always the
        case. Although such an effort might instill some confidence, it would be
        far from definitive: we'd inevitably remain tormented by the nagging
        thought that we'd missed some exotic conjecture-defying triangle.
      </p>
      <p>
        We want something sturdier: a <em>proof</em>. In the remaining pages,
        we'll step through a tidy demonstration of the Pythagorean Theorem.
        Unlike the &ldquo;checking&rdquo; strategy described above, our proof
        will appeal to universal properties of right triangles and other
        geometric figures, rather than relying on the specific details of any
        particular triangle.
      </p>

      <p>
        We'll use the right triangle shown here to illustrate each step. Each of
        the triangle's vertices (<span className="dummy-control-point"></span>)
        can be dragged at any time; this will allow us to observe each step with
        a variety of different triangles.
      </p>
    </section>
  );
};

const Graphics: React.FC<StepProps> = ({ frame }) => {
  const { state } = React.useContext(StateContext);

  const controlPoints = React.useMemo(
    () => animControlPoints(state.tri),
    [state.tri]
  );
  const triangle = React.useMemo(() => animTriangle(state.tri), [state.tri]);
  const measurements = React.useMemo(
    () => animMeasurements(state.tri),
    [state.tri]
  );

  const { rOpacity, hOpacity, vOpacity } = controlPoints.fn(frame);
  const { d, opacity } = triangle.fn(frame);
  const { dA, aOpacity, dB, bOpacity, dC, cOpacity } = measurements.fn(frame);

  const aLabelPos = L.aMeasurementLabel(state.tri);
  const bLabelPos = L.bMeasurementLabel(state.tri);
  const cLabelPos = L.cMeasurementLabel(state.tri);

  return (
    <>
      <Measurement
        d={dA}
        label="a"
        labelPos={aLabelPos}
        labelOpacity={aOpacity}
      />
      <Measurement
        d={dB}
        label="b"
        labelPos={bLabelPos}
        labelOpacity={bOpacity}
      />
      <Measurement
        d={dC}
        label="c"
        labelPos={cLabelPos}
        labelOpacity={cOpacity}
      />

      <MainTriangle d={d} opacity={opacity} />
      <ControlPoints
        rOpacity={rOpacity}
        hOpacity={hOpacity}
        vOpacity={vOpacity}
      />
    </>
  );
};

function animControlPoints(tri: RightTriangle): Anim<ControlPointsState> {
  return Anim.Fork({
    vOpacity: Anim.Ease(0, 0.5, 400),
    rOpacity: Anim.Wait(0, 600).then(Anim.Ease(0, 0.5, 400)),
    hOpacity: Anim.Wait(0, 1200).then(Anim.Ease(0, 0.5, 400)),
  });
}

interface ControlPointsState {
  rOpacity: number;
  hOpacity: number;
  vOpacity: number;
}

function animTriangle(tri: RightTriangle): Anim<TriangleState> {
  const { r, h, v } = tri;

  return Anim.Fork({
    d: AnimExtras.SvgPath([v, r, h], 1800),
    opacity: Anim.Wait(0, 2400).then(Anim.Ease(0, 1, 500)),
  });
}

interface TriangleState {
  d: string;
  opacity: number;
}

function animMeasurements(tri: RightTriangle): Anim<MeasurementsState> {
  return Anim.Fork({
    dA: Anim.Wait('', 3000).then(
      AnimExtras.Measurement(
        L.aMeasurementStart(tri),
        L.aMeasurementEnd(tri),
        20,
        1200
      )
    ),
    aOpacity: Anim.Wait(0, 4200).then(Anim.Ease(0, 1, 800)),
    dB: Anim.Wait('', 4600).then(
      AnimExtras.Measurement(
        L.bMeasurementStart(tri),
        L.bMeasurementEnd(tri),
        20,
        1200
      )
    ),
    bOpacity: Anim.Wait(0, 5800).then(Anim.Ease(0, 1, 800)),
    dC: Anim.Wait('', 6200).then(
      AnimExtras.Measurement(
        L.cMeasurementStart(tri),
        L.cMeasurementEnd(tri),
        20,
        1200
      )
    ),
    cOpacity: Anim.Wait(0, 7400).then(Anim.Ease(0, 1, 800)),
  });
}

interface MeasurementsState {
  dA: string;
  aOpacity: number;
  dB: string;
  bOpacity: number;
  dC: string;
  cOpacity: number;
}

const step = {
  section: Section,
  graphics: Graphics,
  duration: 8200,
};

export default step;
