import { describe, expect, it } from '@jest/globals';
import { partition } from './partition';

describe('partition', () => {
  it('should split the list like ["do", "do not"] satisfy the predicate', () => {
    const list = [true, false];

    const [truey, falsey] = partition(Boolean)(list);

    expect(truey).toStrictEqual([true]);
    expect(falsey).toStrictEqual([false]);
  });
});
