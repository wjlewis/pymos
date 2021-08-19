import React from 'react';
import { Vec } from '../tools';

export function useMouse<E extends HTMLElement>(
  ref: React.RefObject<E>,
  handlers: Handlers
) {
  const [bounds, setBounds] = React.useState({ left: 0, top: 0 });

  const { onMove, onUp } = handlers;

  React.useEffect(() => {
    function computeBounds() {
      if (ref.current) {
        const { left, top } = ref.current.getBoundingClientRect();
        return setBounds({ left, top });
      }
    }

    computeBounds();

    window.addEventListener('resize', computeBounds);
    return () => window.removeEventListener('resize', computeBounds);
  }, [ref]);

  React.useEffect(() => {
    function handleMove(e: MouseEvent) {
      const { left, top } = bounds;
      const { clientX, clientY } = e;
      return onMove(new Vec(clientX - left, clientY - top));
    }

    document.addEventListener('mousemove', handleMove);
    return () => document.removeEventListener('mousemove', handleMove);
  }, [onMove, bounds]);

  React.useEffect(() => {
    function handleUp() {
      return onUp();
    }

    document.addEventListener('mouseup', handleUp);
    return () => document.removeEventListener('mouseup', handleUp);
  }, [onUp]);

  return ref;
}

export interface Handlers {
  onMove: (pos: Vec) => unknown;
  onUp: () => unknown;
}
