import { describe, expect, it } from '@jest/globals';
import { borderRadius } from './border-radius';

describe('borderRadius', () => {
  it('should return the correct CSS variable', () => {
    const size = 'medium';

    expect(borderRadius(size)).toBe(`var(--ods-border-radius-${size})`);
  });
});
