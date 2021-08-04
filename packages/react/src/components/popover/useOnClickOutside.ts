import { RefObject, useEffect } from 'react';

/**
 * Listens for clicks outside the `targets` and calls `onClickOutside`.
 * @param onClickOutside Function to call when a click outside happens.
 * @param targets RefObject of elements to consider "inside".
 */
export const useOnClickOutside = <T extends Element>(
  onClickOutside: ((ev: MouseEvent) => void) | undefined,
  targets: RefObject<T>[]
) =>
  useEffect(() => {
    if (!onClickOutside) return;

    const elements = targets.map((t) => t.current).filter(Boolean) as T[];
    if (!elements.length) return;

    const onClick = (ev: MouseEvent) =>
      elements.some((element) => element.contains(ev.target as Element)) ||
      onClickOutside(ev);

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
