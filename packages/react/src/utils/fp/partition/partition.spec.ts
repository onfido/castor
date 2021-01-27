import { describe, expect, it } from '@jest/globals';
import { partition } from './partition';

describe('partition', () => {
  it('should split the list in a tuple of elements that satisfy the predicate, then those that do not', () => {
    const list = [true, false];

    const [truey, falsey] = partition(Boolean)(list);

    expect(truey).toStrictEqual([true]);
    expect(falsey).toStrictEqual([false]);
  });
});
