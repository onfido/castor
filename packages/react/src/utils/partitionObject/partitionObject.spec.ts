import { describe, expect, it } from '@jest/globals';
import { partitionObject } from './partitionObject';

describe('partitionObject', () => {
  it('should split an object like [{ "does" }, { "does not" }] satisfy the predicate', () => {
    const obj = { foo: true, bar: false };

    const [truthy, falsy] = partitionObject(obj, ([, v]) => Boolean(v));

    expect(truthy).toStrictEqual({ foo: true });
    expect(falsy).toStrictEqual({ bar: false });
  });
});
