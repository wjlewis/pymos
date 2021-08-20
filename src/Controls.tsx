import React from 'react';

export interface ControlsProps {
  frame: number;
  isPlaying: boolean;
  duration: number;
  togglePlay: () => void;
  setFrame: (frame: number) => void;
  restart: () => void;
}

const Controls: React.FC<ControlsProps> = props => {
  const { frame, isPlaying, duration, togglePlay, setFrame, restart } = props;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    return setFrame(Number(e.target.value));
  }

  function handleClick() {
    if (frame >= duration) {
      return restart();
    } else {
      return togglePlay();
    }
  }

  const buttonText =
    frame >= duration ? 'Restart' : isPlaying ? 'Pause' : 'Play';

  return (
    <div id="controls">
      <button onClick={handleClick}>{buttonText}</button>

      <input
        type="range"
        min={0}
        max={duration}
        value={frame}
        onChange={handleChange}
      />
    </div>
  );
};

export default Controls;
