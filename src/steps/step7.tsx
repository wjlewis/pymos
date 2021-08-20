import React from 'react';
import * as L from './locations';
import { StateContext, RightTriangle } from '../state';
import { useAnimationFrame } from '../hooks';
import { Anim, Pose } from '../tools';
import Canvas from '../Canvas';
import Controls from '../Controls';
import ControlPoints from '../ControlPoints';
import MainTriangle from '../MainTriangle';
import Polygon from '../Polygon';
import PosedPolygon from '../PosedPolygon';

const Section: React.FC = () => {
  return (
    <section>
      <h2>Considering the Leftovers (2)</h2>

      <p>
        The original right triangle is <em>also</em> copied 4 times within this
        auxiliary square. Removing these 4 triangles leaves nothing but the two
        squares with areas{' '}
        <code>
          a<sup>2</sup>
        </code>{' '}
        and{' '}
        <code>
          b<sup>2</sup>
        </code>
        ...
      </p>
    </section>
  );
};

const Graphics: React.FC = () => {
  const { state } = React.useContext(StateContext);

  const triCopies = React.useMemo(() => animTriCopies(state.tri), [state.tri]);

  const animControls = useAnimationFrame(triCopies.duration);
  const { frame } = animControls;

  const {
    tri1Pose,
    tri1Opacity,
    tri2Pose,
    tri2Opacity,
    tri3Pose,
    tri3Opacity,
    mainTriOpacity,
  } = triCopies.fn(frame);
  const triPts = L.triCopyPts(state.tri);

  return (
    <>
      <Canvas>
        <Polygon className="main-square" pts={L.aSquare(state.tri)} />
        <Polygon className="main-square" pts={L.bSquare(state.tri)} />
        <Polygon className="main-square dim" pts={L.cSquare(state.tri)} />

        <MainTriangle opacity={mainTriOpacity} strokeOpacity={mainTriOpacity} />
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

        <Polygon className="aux-square" pts={L.abAuxSquare(state.tri)} />
        <ControlPoints />
      </Canvas>

      <Controls {...animControls} />
    </>
  );
};

function animTriCopies(tri: RightTriangle): Anim<TriCopiesState> {
  const initPose = L.initTriPose(tri);
  const copy1Pose = L.triCopyAB1Pose(tri);
  const copy2Pose = L.triCopyAB2Pose(tri);
  const copy3Pose = L.triCopyAB3Pose(tri);

  return Anim.Fork({
    tri1Pose: Anim.Ease(initPose, copy1Pose, 1600),
    tri1Opacity: Anim.Ease(0, 1, 400)
      .then(Anim.Wait(1, 5600))
      .then(Anim.Ease(1, 0, 1200)),
    tri2Pose: Anim.Wait(copy1Pose, 1800).then(
      Anim.Ease(copy1Pose, copy2Pose, 1600)
    ),
    tri2Opacity: Anim.Wait(0, 1800)
      .then(Anim.Ease(0, 1, 400))
      .then(Anim.Wait(1, 3800))
      .then(Anim.Ease(1, 0, 1200)),
    tri3Pose: Anim.Wait(copy2Pose, 3600).then(
      Anim.Ease(copy2Pose, copy3Pose, 1600)
    ),
    tri3Opacity: Anim.Wait(0, 3600)
      .then(Anim.Ease(0, 1, 400))
      .then(Anim.Wait(1, 2000))
      .then(Anim.Ease(1, 0, 1200)),
    mainTriOpacity: Anim.Wait(1, 6000).then(Anim.Ease(1, 0, 1200)),
  });
}

interface TriCopiesState {
  tri1Pose: Pose;
  tri1Opacity: number;
  tri2Pose: Pose;
  tri2Opacity: number;
  tri3Pose: Pose;
  tri3Opacity: number;
  mainTriOpacity: number;
}

const step = {
  section: Section,
  graphics: Graphics,
};

export default step;
