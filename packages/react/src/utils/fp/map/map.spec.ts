import { describe, expect, it } from '@jest/globals';
import { map } from './map';

describe('map', () => {
  it('should call Array.map on the arguments', () => {
    const list = [];

    const result = map((e) => e)(list);

    expect(result).toBe(list);
  });
});
