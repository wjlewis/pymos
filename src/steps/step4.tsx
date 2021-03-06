import React from 'react';
import * as L from './locations';
import { StepProps } from './index';
import { StateContext, RightTriangle } from '../state';
import { Anim, Extras as AnimExtras } from '../tools';
import ControlPoints from '../ControlPoints';
import MainTriangle from '../MainTriangle';
import Polygon from '../Polygon';
import Measurement from '../Measurement';

const Section: React.FC = () => {
  return (
    <section>
      <h2>Computing Areas (1)</h2>

      <p>
        What are the areas of these auxiliary rectangles? We can see that the
        one containing the two smaller squares has a side length of{' '}
        <code>a + b</code>. So it is indeed a square (as we suspected) with an
        area of{' '}
        <code>
          (a + b)<sup>2</sup>
        </code>
        .
      </p>
    </section>
  );
};

const Graphics: React.FC<StepProps> = ({ frame }) => {
  const { state } = React.useContext(StateContext);

  const measurements = React.useMemo(
    () => animMeasurements(state.tri),
    [state.tri]
  );

  const { dA1, a1Opacity, dB1, b1Opacity, dA2, a2Opacity, dB2, b2Opacity } =
    measurements.fn(frame);
  const aLabel1Pos = L.aSquareMeasurement1Label(state.tri);
  const bLabel1Pos = L.bSquareMeasurement1Label(state.tri);
  const aLabel2Pos = L.aSquareMeasurement2Label(state.tri);
  const bLabel2Pos = L.bSquareMeasurement2Label(state.tri);

  return (
    <>
      <Polygon className="main-square" pts={L.aSquare(state.tri)} />
      <Polygon className="main-square" pts={L.bSquare(state.tri)} />
      <Polygon className="main-square dim" pts={L.cSquare(state.tri)} />
      <MainTriangle />
      <Polygon
        className="aux-square"
        pts={L.abAuxSquare(state.tri)}
        opacity={0}
      />

      <Measurement
        d={dA1}
        label="a"
        labelPos={aLabel1Pos}
        labelOpacity={a1Opacity}
      />
      <Measurement
        d={dB1}
        label="b"
        labelPos={bLabel1Pos}
        labelOpacity={b1Opacity}
      />
      <Measurement
        d={dA2}
        label="a"
        labelPos={aLabel2Pos}
        labelOpacity={a2Opacity}
      />
      <Measurement
        d={dB2}
        label="b"
        labelPos={bLabel2Pos}
        labelOpacity={b2Opacity}
      />

      <ControlPoints />
    </>
  );
};

function animMeasurements(tri: RightTriangle): Anim<MeasurementsState> {
  return Anim.Fork({
    dA1: AnimExtras.Measurement(
      L.aSquareMeasurement1Start(tri),
      L.aSquareMeasurement1End(tri),
      20,
      1200
    ),
    a1Opacity: Anim.Wait(0, 1200).then(Anim.Ease(0, 1, 800)),
    dB1: Anim.Wait('', 1600).then(
      AnimExtras.Measurement(
        L.bSquareMeasurement1Start(tri),
        L.bSquareMeasurement1End(tri),
        20,
        1200
      )
    ),
    b1Opacity: Anim.Wait(0, 2800).then(Anim.Ease(0, 1, 800)),
    dA2: AnimExtras.Measurement(
      L.aSquareMeasurement2Start(tri),
      L.aSquareMeasurement2End(tri),
      20,
      1200
    ),
    a2Opacity: Anim.Wait(0, 1200).then(Anim.Ease(0, 1, 800)),
    dB2: Anim.Wait('', 1600).then(
      AnimExtras.Measurement(
        L.bSquareMeasurement2Start(tri),
        L.bSquareMeasurement2End(tri),
        20,
        1200
      )
    ),
    b2Opacity: Anim.Wait(0, 2800).then(Anim.Ease(0, 1, 800)),
  });
}

interface MeasurementsState {
  dA1: string;
  a1Opacity: number;
  dB1: string;
  b1Opacity: number;
  dA2: string;
  a2Opacity: number;
  dB2: string;
  b2Opacity: number;
}

const step = {
  section: Section,
  graphics: Graphics,
  duration: 3400,
};

export default step;
