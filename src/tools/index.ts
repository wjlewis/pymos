export * from './Anim';
export * from './Vec';
export * from './Pose';

export function sign(n: number): number {
  if (n >= 0) {
    return 1;
  } else {
    return -1;
  }
}

export function memo<A, B>(fn: (x: A) => B): (x: A) => B {
  let cachedInput: A;
  let cachedOutput: B;

  return (x: A) => {
    if (cachedInput && cachedInput === x) {
      return cachedOutput;
    }

    cachedInput = x;
    cachedOutput = fn(x);
    return cachedOutput;
  };
}
