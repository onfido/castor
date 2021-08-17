import { useRef } from 'react';

/**
 * Delays `callback` execution until there are no calls in `debounceTime`.
 * @param callback Callback to execute.
 * @param debounceTime Time in milliseconds to debounce events.
 */
export function useDebounce<T extends unknown[]>(
  callback: (...args: T) => void,
  debounceTime?: number
) {
  const timeout = useRef<number>();

  return (...args: T) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(callback, debounceTime, ...args) as never;
  };
}
