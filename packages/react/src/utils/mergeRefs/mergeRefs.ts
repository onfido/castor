import { LegacyRef, MutableRefObject, Ref, RefCallback } from 'react';

/**
 * Merges multiple `ref` objects into one (by passing same element to all).
 *
 * @param refs Array of `ref` objects.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const mergeRefs =
  <T = any>(...refs: Ref<T>[]): RefCallback<T> =>
  (element: T) =>
    refs.filter(Boolean).forEach((ref: LegacyRef<T>) => {
      if (typeof ref === 'function') ref(element);
      else (ref as MutableRefObject<T | null>).current = element;
    });
/* eslint-enable @typescript-eslint/no-explicit-any */
