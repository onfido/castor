import { describe, expect, it } from '@jest/globals';
import { space } from './space';

describe('space', () => {
  it('should return the correct positive "multiplier * base" value', () => {
    expect(space(0.25)).toBe('2px');
    expect(space(0.5)).toBe('4px');
    expect(space(1)).toBe('8px');
    expect(space(1.5)).toBe('12px');
    expect(space(2.5)).toBe('20px');
  });

  it('should return the correct negative "multiplier * base" value', () => {
    expect(space(-0.25)).toBe('-2px');
    expect(space(-0.5)).toBe('-4px');
    expect(space(-1)).toBe('-8px');
    expect(space(-1.5)).toBe('-12px');
    expect(space(-2.5)).toBe('-20px');
  });
});
