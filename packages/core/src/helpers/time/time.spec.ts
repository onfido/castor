import { describe, expect, it } from '@jest/globals';
import { time } from './time';

describe('time', () => {
  it('should return the correct "multiplier" value', () => {
    expect(time(1)).toBe('calc(var(--ods-transition-duration) * 1)');
  });
});
