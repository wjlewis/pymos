import React from 'react';

export function useDims<E extends HTMLElement>(ref: React.RefObject<E>): Dims {
  const [dims, setDims] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    function computeDims() {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect();
        return setDims({ width, height });
      }
    }

    computeDims();

    window.addEventListener('resize', computeDims);
    return () => window.removeEventListener('resize', computeDims);
  }, [ref]);

  return dims;
}

export interface Dims {
  width: number;
  height: number;
}
