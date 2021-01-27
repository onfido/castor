import { describe, expect, it } from '@jest/globals';
import { pipe } from './pipe';

describe('pipe', () => {
  it('should split the list in a tuple of elements that satisfy the predicate, then those that do not', () => {
    const piped = pipe(
      (n: number) => n + 1,
      (n) => n + 10,
      (n) => n + 100
    );

    const result = piped(0);

    expect(result).toBe(111);
  });
});
