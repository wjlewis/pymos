import React from 'react';
import { useDims } from './hooks';
import { clamp } from './tools';

export interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = props => {
  const { min, max, value, onChange } = props;
  const [mouseDown, setMouseDown] = React.useState(false);
  const ref = React.useRef<any>();
  const { width, height, left } = useDims(ref);

  React.useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!mouseDown) {
        return;
      }

      return onChange(computeValue(e.clientX - left));
    }

    function handleTouchMove(e: TouchEvent) {
      if (!mouseDown || e.touches.length !== 1) {
        return;
      }

      return onChange(computeValue(e.touches[0].clientX - left));
    }

    function handleMouseUp() {
      return setMouseDown(false);
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
    };
  });

  function computeValue(x: number): number {
    return clamp(
      ((x - X_PADDING) / workingWidth) * (max - min) + min,
      min,
      max
    );
  }

  const X_PADDING = 40;
  const transform = `translate(0 ${height / 2})`;
  const workingWidth = width - 2 * X_PADDING;

  const sliderX = ((value - min) / (max - min)) * workingWidth;

  function handleMouseDown() {
    return setMouseDown(true);
  }

  return (
    <svg ref={ref} width="100%" height="45px">
      <g transform={transform}>
        <line
          className="slider-line"
          x1={X_PADDING}
          y1="0"
          x2={width - X_PADDING}
          y2="0"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle
          className="slider-button"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          cx={X_PADDING + sliderX}
          cy="0"
          r="15"
        />
      </g>
    </svg>
  );
};

export default Slider;
