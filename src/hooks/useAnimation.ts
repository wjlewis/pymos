import React from 'react';

export function useAnimationFrame(duration: number): UseAnimationFrame {
  const rafHandle = React.useRef<number>();
  const start = React.useRef<number>();
  const pausedFrame = React.useRef<number>(0);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [frame, setFrame] = React.useState(0);

  const step = React.useCallback(
    (timestamp: number) => {
      if (start.current === undefined) {
        start.current = timestamp;
      }

      const currentFrame = timestamp - start.current + pausedFrame.current;
      setFrame(currentFrame);

      if (currentFrame < duration) {
        rafHandle.current = window.requestAnimationFrame(step);
      }
    },
    [duration]
  );

  React.useEffect(() => {
    rafHandle.current = window.requestAnimationFrame(step);
    pausedFrame.current = 0;
    setIsPlaying(true);

    return () => {
      window.cancelAnimationFrame(rafHandle.current as number);
    };
  }, [step]);

  const togglePlay = React.useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
      pausedFrame.current = frame;
      start.current = undefined;
      window.cancelAnimationFrame(rafHandle.current as number);
    } else {
      setIsPlaying(true);
      rafHandle.current = window.requestAnimationFrame(step);
    }
  }, [isPlaying, frame, step]);

  const updateFrame = React.useCallback((frame: Frame) => {
    setFrame(frame);
    setIsPlaying(false);
    pausedFrame.current = frame;
    start.current = undefined;
    window.cancelAnimationFrame(rafHandle.current as number);
  }, []);

  const restart = React.useCallback(() => {
    setFrame(0);
    setIsPlaying(true);
    pausedFrame.current = 0;
    start.current = undefined;
    rafHandle.current = window.requestAnimationFrame(step);
  }, [step]);

  return {
    frame,
    isPlaying,
    duration,
    setFrame: updateFrame,
    togglePlay,
    restart,
  };
}

export interface UseAnimationFrame {
  frame: Frame;
  isPlaying: boolean;
  duration: number;
  setFrame: (frame: Frame) => void;
  togglePlay: () => void;
  restart: () => void;
}

export type Frame = number;
