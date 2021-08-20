import React from 'react';
import { Dims } from '../state';

export function useDims<E extends HTMLElement>(
  ref: React.RefObject<E>,
  onChange: (dims: Dims) => void
): Dims {
  const [dims, setDims] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    function computeDims() {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect();
        const dims = { width, height };
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
