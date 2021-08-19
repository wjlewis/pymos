import React from 'react';
import { Device } from '../state';

export function useCurrentDevice(): Device {
  const [device, setDevice] = React.useState(currentDevice());

  React.useEffect(() => {
    function recalculate() {
      const newDevice = currentDevice();
      if (device !== newDevice) {
        return setDevice(currentDevice());
      }
    }

    window.addEventListener('resize', recalculate);
    return () => window.removeEventListener('resize', recalculate);
  }, [device]);

  return device;
}

function currentDevice(): Device {
  const LAPTOP_MIN = 1024;
  const TABLET_MIN = 768;
  const width = window.innerWidth;

  if (width < TABLET_MIN) {
    return Device.Phone;
  } else if (width < LAPTOP_MIN) {
    return Device.Tablet;
  } else {
    return Device.Laptop;
  }
}
