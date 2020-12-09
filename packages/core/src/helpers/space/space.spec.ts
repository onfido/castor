import { describe, expect, it } from '@jest/globals';
import { space } from './space';

describe('space', () => {
  it('should return the correct "multiplier * base" value', () => {
    expect(space(1)).toBe('8px');
  });

  it('should allow (1.5, 0.5, 0.25, 0.125)', () => {
    expect(space(1.5)).toBe('12px');
    expect(space(0.5)).toBe('4px');
    expect(space(0.25)).toBe('2px');
    expect(space(0.125)).toBe('1px');
  });

  it('should throw for non integers or not in (1.5, 0.5, 0.25, 0.125)', () => {
    expect(() => space(2.5)).toThrowError(
      '"multiplier" must be an integer or (1.5, 0.5, 0.25, 0.125). Got: 2.5'
    );
  });
});
