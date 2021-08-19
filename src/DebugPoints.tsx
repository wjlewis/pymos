import React from 'react';
import { StateContext } from './state';
import { Locations as L } from './steps';
import { Vec } from './tools';

const DebugPoints: React.FC = () => {
  const { state } = React.useContext(StateContext);
  const { tri } = state;

  const { r, h, v } = tri;

  const a0 = L.a0(tri);
  const a1 = L.a1(tri);
  const b0 = L.b0(tri);
  const b1 = L.b1(tri);
  const c0 = L.c0(tri);
  const c1 = L.c1(tri);

  const abOut = L.abOut(tri);
  const abIn = L.abIn(tri);
  const cAuxV = L.cAuxV(tri);
  const cAuxDiag = L.cAuxDiag(tri);
  const cAuxH = L.cAuxH(tri);

  return (
    <g>
      {/* Main Triangle Points */}
      <DebugPoint name="r" pos={r} />
      <DebugPoint name="h" pos={h} />
      <DebugPoint name="v" pos={v} />

      {/* Main Squares */}
      <DebugPolygon pts={[v, a0, a1, r]} />
      <DebugPolygon pts={[r, b0, b1, h]} />
      <DebugPolygon pts={[h, c0, c1, v]} />
      <DebugPoint name="a0" pos={a0} />
      <DebugPoint name="a1" pos={a1} />
      <DebugPoint name="b0" pos={b0} />
      <DebugPoint name="b1" pos={b1} />
      <DebugPoint name="c0" pos={c0} />
      <DebugPoint name="c1" pos={c1} />

      {/* Auxiliary Squares */}
      <DebugPolygon pts={[v, a0, abOut, b1, abIn]} />
      <DebugPolygon pts={[r, cAuxV, cAuxDiag, cAuxH]} />
      <DebugPoint name="abOut" pos={abOut} />
      <DebugPoint name="abIn" pos={abIn} />
      <DebugPoint name="cAuxV" pos={cAuxV} />
      <DebugPoint name="cAuxDiag" pos={cAuxDiag} />
      <DebugPoint name="cAuxH" pos={cAuxH} />
    </g>
  );
};

interface DebugPointProps {
  name: string;
  pos: Vec;
}

const DebugPoint: React.FC<DebugPointProps> = props => {
  const { name, pos } = props;
  const { x, y } = pos;

  return (
    <g className="debug-point">
      <text x={x} y={y} dx="0.5em" dy="-0.3em">
        {name}
      </text>
      <circle cx={x} cy={y} r="5" />
    </g>
  );
};

interface DebugPolygonProps {
  pts: Vec[];
}

const DebugPolygon: React.FC<DebugPolygonProps> = props => {
  const { pts } = props;

  const d = `M ${pts.map(pt => `${pt.x} ${pt.y}`).join(' L ')} Z`;

  return <path className="debug-polygon" d={d} />;
};

export default DebugPoints;
