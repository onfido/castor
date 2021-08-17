import { RefObject, useEffect } from 'react';

/**
 * Observes `targets` for intersection changes.
 * @param createObserver Function that returns an observer.
 * @param targets `RefObject` of element to observe.
 */
export function useObserver<T extends Element>(
  createObserver: () => Observer,
  targets: RefObject<T>[]
) {
  useEffect(() => {
    const elements = targets.map((t) => t.current).filter(Boolean) as T[];
    if (!elements.length) return;

    const observer = createObserver();
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

type Observer = Pick<
  IntersectionObserver | MutationObserver | ResizeObserver,
  'disconnect' | 'observe'
>;
