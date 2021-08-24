import React from 'react';
import * as L from './locations';
import { StepProps } from './index';
import { StateContext, RightTriangle } from '../state';
import { Anim, Pose } from '../tools';
import ControlPoints from '../ControlPoints';
import MainTriangle from '../MainTriangle';
import Polygon from '../Polygon';
import PosedPolygon from '../PosedPolygon';
import SquareLabel from '../SquareLabel';
import Label from '../Label';

const Section: React.FC = () => {
  return (
    <section>
      <h2>Considering the Leftovers (2)</h2>

      <p>
        The other auxiliary square has a similar property. In particular, it
        contains 4 copies of the original triangle, and its remaining area is
        occupied by the squares whose areas are{' '}
        <code>
          a<sup>2</sup>
        </code>{' '}
        and{' '}
        <code>
          b<sup>2</sup>
        </code>
        . In other words,{' '}
        <code>
          a<sup>2</sup> + b<sup>2</sup>
        </code>{' '}
        is the total area left over after removing 4 right triangles from the
        original auxiliary square.
      </p>

      <p>
        Using the names we devised in the previous step (and recalling that both
        auxiliary squares have the same area), we can express this discovery
        like so:{' '}
        <code>
          a<sup>2</sup> + b<sup>2</sup> = S - 4T
        </code>
        .
      </p>

      <p>
        This looks familiar! We determined in the previous step that{' '}
        <code>
          c<sup>2</sup> = S - 4T
        </code>{' '}
        as well. Since{' '}
        <em>
          two things that are equal to the same thing are equal to each other
        </em>
        , it must be the case that{' '}
        <code>
          a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup>
        </code>
        .
      </p>
    </section>
  );
};

const Graphics: React.FC<StepProps> = ({ frame }) => {
  const { state } = React.useContext(StateContext);

  const triCopies = React.useMemo(() => animTriCopies(state.tri), [state.tri]);

  const {
    tri1Pose,
    tri1Opacity,
    tri2Pose,
    tri2Opacity,
    tri3Pose,
    tri3Opacity,
    mainTriOpacity,
    squareLabelOpacity,
    triLabelOpacity,
  } = triCopies.fn(frame);
  const triPts = L.triCopyPts(state.tri);

  return (
    <>
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

      <Polygon
        className="aux-square"
        pts={L.abAuxSquare(state.tri)}
        opacity={0}
      />

      <SquareLabel
        side="a"
        pos={L.aSquareLabel(state.tri)}
        opacity={squareLabelOpacity}
      />
      <SquareLabel
        side="b"
        pos={L.bSquareLabel(state.tri)}
        opacity={squareLabelOpacity}
      />
      <Label
        className="tri-label"
        name="T"
        pos={L.mainTriLabel(state.tri)}
        opacity={triLabelOpacity}
      />
      <Label
        className="tri-label"
        name="T"
        pos={L.triCopyAB1Label(state.tri)}
        opacity={triLabelOpacity}
      />
      <Label
        className="tri-label"
        name="T"
        pos={L.triCopyAB2Label(state.tri)}
        opacity={triLabelOpacity}
      />
      <Label
        className="tri-label"
        name="T"
        pos={L.triCopyAB3Label(state.tri)}
        opacity={triLabelOpacity}
      />

      <ControlPoints />
    </>
  );
};

function animTriCopies(tri: RightTriangle): Anim<TriCopiesState> {
  const initPose = L.initTriPose(tri);
  const copy1Pose = L.triCopyAB1Pose(tri);
  const copy2Pose = L.triCopyAB2Pose(tri);
  const copy3Pose = L.triCopyAB3Pose(tri);

  return Anim.Fork({
    tri1Pose: Anim.Ease(initPose, copy1Pose, 1200),
    tri1Opacity: Anim.Ease(0, 1, 400)
      .then(Anim.Wait(1, 6000))
      .then(Anim.Ease(1, 0, 1200)),
    tri2Pose: Anim.Wait(copy1Pose, 1400).then(
      Anim.Ease(copy1Pose, copy2Pose, 1200)
    ),
    tri2Opacity: Anim.Wait(0, 1200)
      .then(Anim.Ease(0, 1, 400))
      .then(Anim.Wait(1, 4800))
      .then(Anim.Ease(1, 0, 1200)),
    tri3Pose: Anim.Wait(copy2Pose, 2800).then(
      Anim.Ease(copy2Pose, copy3Pose, 1200)
    ),
    tri3Opacity: Anim.Wait(0, 2800)
      .then(Anim.Ease(0, 1, 400))
      .then(Anim.Wait(1, 3200))
      .then(Anim.Ease(1, 0, 1200)),
    mainTriOpacity: Anim.Wait(1, 6400).then(Anim.Ease(1, 0, 1200)),

    squareLabelOpacity: Anim.Wait(0, 4000).then(Anim.Ease(0, 1, 800)),
    triLabelOpacity: Anim.Wait(0, 4000)
      .then(Anim.Ease(0, 1, 800))
      .then(Anim.Wait(1, 1600))
      .then(Anim.Ease(1, 0, 1200)),
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
  squareLabelOpacity: number;
  triLabelOpacity: number;
}

const step = {
  section: Section,
  graphics: Graphics,
  duration: 7600,
};

export default step;
