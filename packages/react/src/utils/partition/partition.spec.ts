import { describe, expect, it } from '@jest/globals';
import { partition } from './partition';

describe('partition', () => {
  it('should split the list like ["do", "do not"] satisfy the predicate', () => {
    const list = [true, false];

    const [truthy, falsy] = partition(list, Boolean);

    expect(truthy).toStrictEqual([true]);
    expect(falsy).toStrictEqual([false]);
  });
});
