import { describe, expect, it } from '@jest/globals';
import { partitionObject } from './partitionObject';

describe('partitionObject', () => {
  it('should split an object like [{ "does" }, { "does not" }] satisfy the predicate', () => {
    const obj = { foo: true, bar: false };

    const [truey, falsey] = partitionObject(obj, Boolean);

    expect(truey).toStrictEqual({ foo: true });
    expect(falsey).toStrictEqual({ bar: false });
  });
});
