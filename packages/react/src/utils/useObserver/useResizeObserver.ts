import { RefObject } from 'react';
import { useDebounce } from '../useDebounce/useDebounce';
import { useObserver } from './useObserver';

/**
 * Observes `targets` for resize changes.
 * @param onResize Called when the element resizes.
 * @param targets `RefObject` of elements to observe.
 * @param debounceTime Time in milliseconds to debounce events.
 */
export function useResizeObserver<T extends Element>(
  onResize: (entry: ResizeObserverEntry) => void,
  targets: RefObject<T>[],
  debounceTime?: number
) {
  const debouncedOnResize = useDebounce(onResize, debounceTime);

  useObserver(
    () => new ResizeObserver(([entry]) => debouncedOnResize(entry)),
    targets
  );
}
