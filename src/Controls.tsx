import React from 'react';
import Slider from './Slider';
import playHref from './assets/play.svg';
import pauseHref from './assets/pause.svg';
import restartHref from './assets/restart.svg';

export interface ControlsProps {
  frame: number;
  playing: boolean;
  duration: number;
  togglePlay: () => void;
  setFrame: (frame: number) => void;
  restart: () => void;
}

const Controls: React.FC<ControlsProps> = props => {
  const { frame, playing, duration, togglePlay, setFrame, restart } = props;

  function handleChange(frame: number) {
    return setFrame(frame);
  }

  function handleClick() {
    if (frame >= duration) {
      return restart();
    } else {
      return togglePlay();
    }
  }

  const buttonHref =
    frame >= duration ? restartHref : playing ? pauseHref : playHref;
  const buttonAlt = frame >= duration ? 'Restart' : playing ? 'Pause' : 'Play';

  return (
    <div id="controls">
      <button onClick={handleClick}>
        <img src={buttonHref} alt={buttonAlt} />
      </button>
      <Slider min={0} max={duration} value={frame} onChange={handleChange} />
    </div>
  );
};

export default Controls;
