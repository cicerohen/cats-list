type DebounceFunction = (...args: any[]) => void;

export const debounce = <T extends DebounceFunction>(
  func: T,
  delay: number,
): T => {
  let timeoutId: NodeJS.Timeout;

  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  } as T;
};
