import React from 'react';
import * as L from './locations';
import { StateContext, RightTriangle } from '../state';
import { useAnimationFrame } from '../hooks';
import { Anim } from '../tools';
import Canvas from '../Canvas';
import Controls from '../Controls';
import ControlPoints from '../ControlPoints';
import MainTriangle from '../MainTriangle';
import Polygon from '../Polygon';
import PosedPolygon from '../PosedPolygon';

const Section: React.FC = () => {
  return (
    <section>
      <h2>Considering the Leftovers (1)</h2>

      <p>
        We just saw that this auxiliary square contains 4 copies of the original
        right triangle, along with the square whose area is{' '}
        <code>
          c<sup>2</sup>
        </code>
        . As a result, if we
        <em>remove</em> the four copies of the right triangle, the remaining
        area is simply{' '}
        <code>
          c<sup>2</sup>
        </code>
        .
      </p>
    </section>
  );
};

const Graphics: React.FC = () => {
  const { state } = React.useContext(StateContext);

  const opacity = React.useMemo(() => animOpacity(state.tri), [state.tri]);

  const animControls = useAnimationFrame(opacity.duration);
  const { frame } = animControls;

  const { triOpacity } = opacity.fn(frame);
  const triPts = L.triCopyPts(state.tri);

  return (
    <>
      <Canvas>
        <Polygon className="main-square dim" pts={L.aSquare(state.tri)} />
        <Polygon className="main-square dim" pts={L.bSquare(state.tri)} />
        <Polygon className="main-square" pts={L.cSquare(state.tri)} />

        <MainTriangle opacity={triOpacity} strokeOpacity={triOpacity} />
        <PosedPolygon
          className="main-triangle-copy"
          pts={triPts}
          pose={L.triCopyC1Pose(state.tri)}
          opacity={triOpacity}
        />
        <PosedPolygon
          className="main-triangle-copy"
          pts={triPts}
          pose={L.triCopyC2Pose(state.tri)}
          opacity={triOpacity}
        />
        <PosedPolygon
          className="main-triangle-copy"
          pts={triPts}
          pose={L.triCopyC3Pose(state.tri)}
          opacity={triOpacity}
        />

        <Polygon className="aux-square" pts={L.cAuxSquare(state.tri)} />
        <ControlPoints />
      </Canvas>

      <Controls {...animControls} />
    </>
  );
};

function animOpacity(tri: RightTriangle): Anim<OpacityState> {
  return Anim.Fork({
    triOpacity: Anim.Ease(1, 0, 1200),
  });
}

interface OpacityState {
  triOpacity: number;
}

const step = {
  section: Section,
  graphics: Graphics,
};

export default step;
