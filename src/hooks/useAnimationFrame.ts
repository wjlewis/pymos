import React from 'react';

export function useAnimationFrame(
  duration: number,
  deps: any[] = []
): AnimControls {
  const [frame, setFrame] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const pausedFrame = React.useRef(0);

  React.useLayoutEffect(() => {
    setFrame(0);
    setPlaying(true);
    pausedFrame.current = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  React.useLayoutEffect(() => {
    let start: number;
    let rafHandle: number;

    function step(timestamp: DOMHighResTimeStamp) {
      if (!start) {
        start = timestamp;
      }

      const currentFrame = timestamp - start + pausedFrame.current;

      if (playing && currentFrame < duration) {
        setFrame(currentFrame);
        rafHandle = requestAnimationFrame(step);
      } else {
        setPlaying(false);
        setFrame(duration);
      }
    }

    if (playing) {
      rafHandle = requestAnimationFrame(step);
    }

    return () => cancelAnimationFrame(rafHandle);
  }, [playing, duration]);

  const togglePlay = React.useCallback(() => {
    if (playing) {
      pausedFrame.current = frame;
    }
    setPlaying(!playing);
  }, [playing, frame]);

  const restart = React.useCallback(() => {
    pausedFrame.current = 0;
    setPlaying(true);
  }, []);

  const updateFrame = React.useCallback(
    frame => {
      if (playing) {
        setPlaying(false);
      }
      pausedFrame.current = frame;
      setFrame(frame);
    },
    [playing]
  );

  return {
    duration,
    frame,
    playing,
    togglePlay,
    restart,
    setFrame: updateFrame,
  };
}

export interface AnimControls {
  duration: number;
  frame: number;
  playing: boolean;
  togglePlay: () => void;
  restart: () => void;
  setFrame: (frame: number) => void;
}
