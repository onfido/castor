import { RefObject } from 'react';
import { useDebounce } from '../useDebounce/useDebounce';
import { useObserver } from './useObserver';

/**
 * Observes `targets` for intersection changes.
 * @param onChange Called when the threshold changes.
 * Essentially when target is clipped on either edge.
 * @param targets `RefObject` of elements to observe.
 * @param debounceTime Time in milliseconds to debounce events.
 */
export function useIntersectionObserver<T extends Element>(
  onChange: (entry: IntersectionObserverEntry) => void,
  targets: RefObject<T>[],
  debounceTime?: number
) {
  const debouncedOnChange = useDebounce(onChange, debounceTime);

  useObserver(
    () =>
      new IntersectionObserver(
        ([entry]) => debouncedOnChange(entry),
        { threshold: [0, 1] } // watch both extremities of the rectangle
      ),
    targets
  );
}
