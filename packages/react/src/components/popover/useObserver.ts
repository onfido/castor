import { RefObject, useEffect, useRef } from 'react';

/**
 * Observes `targets` for intersection changes.
 * @param targets `RefObject` of element to observe.
 * @param onChange Called when the threshold changes. Either the element just became visible or the opposite.
 * @param debounceTime Time in milliseconds to debounce events.
 */
export function useObserver<T extends Element>(
  onChange: (entry: IntersectionObserverEntry) => void,
  targets: RefObject<T>[],
  debounceTime?: number
) {
  const timeout = useRef<number>();

  useEffect(() => {
    const elements = targets.map((t) => t.current).filter(Boolean) as T[];
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(onChange, debounceTime, entry) as never;
      },
      { threshold: [0, 1] } // watch both extremities of the rectangle
    );

    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, [debounceTime]);
}
