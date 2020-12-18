import { describe, expect, it } from '@jest/globals';
import { space } from './space';

describe('space', () => {
  const allowedFloats = [1.5, 0.5, 0.25, 0.125];
  allowedFloats.toString = () => `(${allowedFloats.join(', ')})`;
  const base = 8;

  it('should return the correct "multiplier * base" value', () => {
    expect(space(1)).toBe('8px');
  });

  it(`should allow ${allowedFloats}`, () => {
    for (const float of allowedFloats)
      expect(space(float)).toBe(`${float * base}px`);
  });

  it(`should throw for non integers and not in ${allowedFloats}`, () => {
    expect(() => space(2.5)).toThrow(
      `"multiplier" must be an integer or ${allowedFloats}`
    );
  });
});
