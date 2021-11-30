import { describe, expect, it, jest } from '@jest/globals';
import { useForwardedRef } from './useForwardedRef';

jest.mock('react', () => ({
  useEffect: (callback: any) => callback(),
  useRef: () => ({ current: {} }),
}));

describe('useForwardedRef', () => {
  it('should normalise a function into a mutable object', () => {
    let current;
    const forwardedRef = (ref: any) => void (current = ref);

    const ref = useForwardedRef(forwardedRef);

    expect(ref.current).toBe(current);
  });

  it('should share the same "current" pointer between two object refs', () => {
    const forwardedRef = { current: undefined };

    const ref = useForwardedRef(forwardedRef);

    expect(ref.current).toBe(forwardedRef.current);
  });

  it('should gracefully ignore null refs', () => {
    const ref = useForwardedRef(null);

    expect(ref.current).toBeDefined();
  });
});
