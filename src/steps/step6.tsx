import React from 'react';
import * as L from './locations';
import { StepProps } from './index';
import { StateContext, RightTriangle } from '../state';
import { Anim } from '../tools';
import ControlPoints from '../ControlPoints';
import MainTriangle from '../MainTriangle';
import Polygon from '../Polygon';
import PosedPolygon from '../PosedPolygon';
import SquareLabel from '../SquareLabel';
import Label from '../Label';

const Section: React.FC = () => {
  return (
    <section>
      <h2>Considering the Leftovers</h2>

      <p>
        We've just seen that the second auxiliary square contains 4 copies of
        the original right triangle. Its remaining area is occupied by the
        square whose area is{' '}
        <code>
          c<sup>2</sup>
        </code>
        . In other words,{' '}
        <code>
          c<sup>2</sup>
        </code>{' '}
        is the total area left over after removing 4 right triangles from the
        auxiliary square.
      </p>

      <p>
        If we call the area of the auxiliary square <code>S</code>, and the area
        of our original right triangle <code>T</code>, we can express this
        relationship symbolically as{' '}
        <code>
          c<sup>2</sup> = S - 4T
        </code>
        .
      </p>
    </section>
  );
};

const Graphics: React.FC<StepProps> = ({ frame }) => {
  const { state } = React.useContext(StateContext);

  const opacity = React.useMemo(() => animOpacity(state.tri), [state.tri]);

  const {
    c2LabelOpacity,
    auxOpacity,
    auxLabelOpacity,
    mainTriOpacity,
    mainTriLabelOpacity,
    tri1Opacity,
    tri1LabelOpacity,
    tri2Opacity,
    tri2LabelOpacity,
    tri3Opacity,
    tri3LabelOpacity,
  } = opacity.fn(frame);
  const triPts = L.triCopyPts(state.tri);

  return (
    <>
      <Polygon className="main-square dim" pts={L.aSquare(state.tri)} />
      <Polygon className="main-square dim" pts={L.bSquare(state.tri)} />
      <Polygon className="main-square" pts={L.cSquare(state.tri)} />

      <Polygon
        className="aux-square"
        pts={L.cAuxSquare(state.tri)}
        opacity={auxOpacity}
      />
      <Label
        className="aux-square-label"
        name="S"
        pos={L.cSquareLabel(state.tri)}
        opacity={auxLabelOpacity}
      />
      <SquareLabel
        side="c"
        pos={L.cSquareLabel(state.tri)}
        opacity={c2LabelOpacity}
      />

      <PosedPolygon
        className="main-triangle-copy"
        pts={triPts}
        pose={L.triCopyC1Pose(state.tri)}
        opacity={tri1Opacity}
      />
      <PosedPolygon
        className="main-triangle-copy"
        pts={triPts}
        pose={L.triCopyC2Pose(state.tri)}
        opacity={tri2Opacity}
      />
      <PosedPolygon
        className="main-triangle-copy"
        pts={triPts}
        pose={L.triCopyC3Pose(state.tri)}
        opacity={tri3Opacity}
      />
      <MainTriangle opacity={mainTriOpacity} strokeOpacity={mainTriOpacity} />
      <Label
        className="tri-label"
        name="T"
        pos={L.mainTriLabel(state.tri)}
        opacity={mainTriLabelOpacity}
      />
      <Label
        className="tri-label"
        name="T"
        pos={L.triCopyC1Label(state.tri)}
        opacity={tri1LabelOpacity}
      />
      <Label
        className="tri-label"
        name="T"
        pos={L.triCopyC2Label(state.tri)}
        opacity={tri2LabelOpacity}
      />
      <Label
        className="tri-label"
        name="T"
        pos={L.triCopyC3Label(state.tri)}
        opacity={tri3LabelOpacity}
      />

      <ControlPoints />
    </>
  );
};

function animOpacity(tri: RightTriangle): Anim<OpacityState> {
  return Anim.Fork({
    c2LabelOpacity: Anim.Wait(0, 4000).then(Anim.Ease(0, 1, 800)),

    auxOpacity: Anim.Wait(1, 3400).then(Anim.Ease(1, 0, 800)),
    auxLabelOpacity: Anim.Ease(0, 1, 800)
      .then(Anim.Wait(1, 2800))
      .then(Anim.Ease(1, 0, 800)),

    mainTriOpacity: Anim.Wait(0, 1000)
      .then(Anim.Ease(0, 1, 800))
      .then(Anim.Wait(1, 4600))
      .then(Anim.Ease(1, 0, 800)),
    mainTriLabelOpacity: Anim.Wait(0, 4000)
      .then(Anim.Ease(0, 1, 800))
      .then(Anim.Wait(1, 1900))
      .then(Anim.Ease(1, 0, 800)),

    tri1Opacity: Anim.Wait(0, 1500)
      .then(Anim.Ease(0, 1, 800))
      .then(Anim.Wait(1, 4600))
      .then(Anim.Ease(1, 0, 800)),
    tri1LabelOpacity: Anim.Wait(0, 4000)
      .then(Anim.Ease(0, 1, 800))
      .then(Anim.Wait(1, 2400))
      .then(Anim.Ease(1, 0, 800)),

    tri2Opacity: Anim.Wait(0, 2000)
      .then(Anim.Ease(0, 1, 800))
      .then(Anim.Wait(1, 4600))
      .then(Anim.Ease(1, 0, 800)),
    tri2LabelOpacity: Anim.Wait(0, 4000)
      .then(Anim.Ease(0, 1, 800))
      .then(Anim.Wait(1, 2900))
      .then(Anim.Ease(1, 0, 800)),

    tri3Opacity: Anim.Wait(0, 2500)
      .then(Anim.Ease(0, 1, 800))
      .then(Anim.Wait(1, 4600))
      .then(Anim.Ease(1, 0, 800)),
    tri3LabelOpacity: Anim.Wait(0, 4000)
      .then(Anim.Ease(0, 1, 800))
      .then(Anim.Wait(1, 3400))
      .then(Anim.Ease(1, 0, 800)),
  });
}

interface OpacityState {
  c2LabelOpacity: number;
  auxOpacity: number;
  auxLabelOpacity: number;
  mainTriOpacity: number;
  mainTriLabelOpacity: number;
  tri1Opacity: number;
  tri1LabelOpacity: number;
  tri2Opacity: number;
  tri2LabelOpacity: number;
  tri3Opacity: number;
  tri3LabelOpacity: number;
}

const step = {
  section: Section,
  graphics: Graphics,
  duration: 10000,
};

export default step;
