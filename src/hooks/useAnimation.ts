import React from 'react';

export function useAnimationFrame(): [Frame, () => void] {
  const rafHandle: React.MutableRefObject<undefined | number> = React.useRef();
  const start: React.MutableRefObject<undefined | number> = React.useRef();
  const [frame, setFrame] = React.useState(0);

  const step = React.useCallback((timestamp: number) => {
    if (start.current === undefined) {
      start.current = timestamp;
    }

    setFrame(timestamp - start.current);
    rafHandle.current = window.requestAnimationFrame(step);
  }, []);

  React.useEffect(() => {
    rafHandle.current = window.requestAnimationFrame(step);

    return () => {
      console.log('cancelling...');
      window.cancelAnimationFrame(rafHandle.current as number);
    };
  }, [step]);

  function reset() {
    if (rafHandle.current) {
      window.cancelAnimationFrame(rafHandle.current);
    }

    start.current = undefined;
    rafHandle.current = window.requestAnimationFrame(step);
  }

  return [frame, reset];
}

export type Frame = number;
