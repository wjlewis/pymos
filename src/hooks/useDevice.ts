import React from 'react';
import { Device } from '../state';

export function useDevice(onChange: (device: Device) => void) {
  const callback = React.useRef(onChange);

  React.useLayoutEffect(() => {
    function recompute() {
      return callback.current(currentDevice());
    }

    recompute();

    window.addEventListener('resize', recompute);
    return () => window.removeEventListener('resize', recompute);
  }, []);
}

// Keep in sync with src/index.css
const LARGE_BREAKPOINT = 1024;

function currentDevice() {
  if (window.innerWidth >= LARGE_BREAKPOINT) {
    return Device.Laptop;
  } else {
    return Device.Mobile;
  }
}
