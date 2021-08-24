import React from 'react';
import { noOp } from '../tools';

export function useDims<E extends HTMLElement>(
  ref: React.RefObject<E>,
  onChange: (dims: Dims) => void = noOp
): Dims {
  const [dims, setDims] = React.useState({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });

  React.useLayoutEffect(() => {
    function computeDims() {
      if (ref.current) {
        const { width, height, left, top } =
          ref.current.getBoundingClientRect();
        const dims = { width, height, left, top };
        onChange(dims);
        return setDims(dims);
      }
    }

    computeDims();

    window.addEventListener('resize', computeDims);
    return () => window.removeEventListener('resize', computeDims);
  }, [ref, onChange]);

  return dims;
}

export interface Dims {
  width: number;
  height: number;
  left: number;
  top: number;
}
