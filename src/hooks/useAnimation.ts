import React from 'react';

export function useAnimationFrame(): Frame {
  const rafHandle: React.MutableRefObject<undefined | number> = React.useRef();
  const start: React.MutableRefObject<undefined | number> = React.useRef();
  const [frame, setFrame] = React.useState(0);

  React.useEffect(() => {
    function step(timestamp: number) {
      if (start.current === undefined) {
        start.current = timestamp;
      }

      setFrame(timestamp - start.current);
      rafHandle.current = window.requestAnimationFrame(step);
    }

    rafHandle.current = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(rafHandle.current as number);
  }, []);

  return frame;
}

export type Frame = number;
