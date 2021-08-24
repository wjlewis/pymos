import React from 'react';
import * as L from './locations';
import { StepProps } from './index';
import { StateContext, RightTriangle } from '../state';
import { Anim, Pose, Extras as AnimExtras } from '../tools';
import ControlPoints from '../ControlPoints';
import MainTriangle from '../MainTriangle';
import Polygon from '../Polygon';
import PosedPolygon from '../PosedPolygon';
import Measurement from '../Measurement';

const Section: React.FC = () => {
  return (
    <section>
      <h2>Computing Areas (2)</h2>

      <p>
        The area of the second auxiliar rectangle is a bit trickier to compute.
        However, once we see that our original right triangle appears
        &ldquo;copied&rdquo; inside of it, it's clear that its sides have length{' '}
        <code>a + b</code> as well. Accordingly, it is <em>also</em> a square
        with area{' '}
        <code>
          (a + b)<sup>2</sup>
        </code>
        .
      </p>

      <p>
        This confirms what we first suspected several steps back, namely that
        both auxiliary rectangles have <em>the same area</em>.
      </p>
    </section>
  );
};

const Graphics: React.FC<StepProps> = ({ frame }) => {
  const { state } = React.useContext(StateContext);

  const triCopies = React.useMemo(() => animTriCopies(state.tri), [state.tri]);
  const measurements = React.useMemo(
    () => animMeasurements(state.tri),
    [state.tri]
  );

  const {
    tri1Pose,
    tri1Opacity,
    tri2Pose,
    tri2Opacity,
    tri3Pose,
    tri3Opacity,
  } = triCopies.fn(frame);
  const triPts = L.triCopyPts(state.tri);

  const { dA1, a1Opacity, dB1, b1Opacity, dA2, a2Opacity, dB2, b2Opacity } =
    measurements.fn(frame);
  const aLabel1Pos = L.cSquareMeasurementA1Label(state.tri);
  const bLabel1Pos = L.cSquareMeasurementB1Label(state.tri);
  const aLabel2Pos = L.cSquareMeasurementA2Label(state.tri);
  const bLabel2Pos = L.cSquareMeasurementB2Label(state.tri);

  return (
    <>
      <Polygon className="main-square dim" pts={L.aSquare(state.tri)} />
      <Polygon className="main-square dim" pts={L.bSquare(state.tri)} />
      <Polygon className="main-square" pts={L.cSquare(state.tri)} />
      <MainTriangle />

      <PosedPolygon
        className="main-triangle-copy"
        pts={triPts}
        pose={tri1Pose}
        opacity={tri1Opacity}
      />
      <PosedPolygon
        className="main-triangle-copy"
        pts={triPts}
        pose={tri2Pose}
        opacity={tri2Opacity}
      />
      <PosedPolygon
        className="main-triangle-copy"
        pts={triPts}
        pose={tri3Pose}
        opacity={tri3Opacity}
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

      <Polygon
        className="aux-square"
        pts={L.cAuxSquare(state.tri)}
        opacity={0}
      />
      <ControlPoints />
    </>
  );
};

function animTriCopies(tri: RightTriangle): Anim<TriCopiesState> {
  const initPose = L.initTriPose(tri);
  const copy1Pose = L.triCopyC1Pose(tri);
  const copy2Pose = L.triCopyC2Pose(tri);
  const copy3Pose = L.triCopyC3Pose(tri);

  return Anim.Fork({
    tri1Pose: Anim.Ease(initPose, copy1Pose, 1200),
    tri1Opacity: Anim.Ease(0, 1, 400),
    tri2Pose: Anim.Wait(copy1Pose, 1200).then(
      Anim.Ease(copy1Pose, copy2Pose, 1200)
    ),
    tri2Opacity: Anim.Wait(0, 1200).then(Anim.Ease(0, 1, 400)),
    tri3Pose: Anim.Wait(copy2Pose, 2400).then(
      Anim.Ease(copy2Pose, copy3Pose, 1200)
    ),
    tri3Opacity: Anim.Wait(0, 2400).then(Anim.Ease(0, 1, 400)),
  });
}

interface TriCopiesState {
  tri1Pose: Pose;
  tri1Opacity: number;
  tri2Pose: Pose;
  tri2Opacity: number;
  tri3Pose: Pose;
  tri3Opacity: number;
}

function animMeasurements(tri: RightTriangle): Anim<MeasurementsState> {
  return Anim.Fork({
    dA1: Anim.Wait('', 4000).then(
      AnimExtras.Measurement(
        L.cSquareMeasurementA1Start(tri),
        L.cSquareMeasurementA1End(tri),
        20,
        1200
      )
    ),
    a1Opacity: Anim.Wait(0, 5200).then(Anim.Ease(0, 1, 800)),
    dB1: Anim.Wait('', 5600).then(
      AnimExtras.Measurement(
        L.cSquareMeasurementB1Start(tri),
        L.cSquareMeasurementB1End(tri),
        20,
        1200
      )
    ),
    b1Opacity: Anim.Wait(0, 6800).then(Anim.Ease(0, 1, 800)),
    dA2: Anim.Wait('', 4000).then(
      AnimExtras.Measurement(
        L.cSquareMeasurementA2Start(tri),
        L.cSquareMeasurementA2End(tri),
        20,
        1200
      )
    ),
    a2Opacity: Anim.Wait(0, 5200).then(Anim.Ease(0, 1, 800)),
    dB2: Anim.Wait('', 5600).then(
      AnimExtras.Measurement(
        L.cSquareMeasurementB2Start(tri),
        L.cSquareMeasurementB2End(tri),
        20,
        1200
      )
    ),
    b2Opacity: Anim.Wait(0, 6800).then(Anim.Ease(0, 1, 800)),
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
  duration: 7600,
};

export default step;
