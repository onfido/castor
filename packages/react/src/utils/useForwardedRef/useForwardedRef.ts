import { ForwardedRef, useEffect, useRef } from 'react';

/**
 * Normalizes a forwarded ref into a ref object.
 * @param ref Forwarded ref.
 */
export function useForwardedRef<T>(ref: ForwardedRef<T>) {
  const mutableRef = useRef<T>(null);

  useEffect(() => {
    if (typeof ref === 'function') ref(mutableRef.current);
    else if (ref) ref.current = mutableRef.current;
  }, []);

  return mutableRef;
}
