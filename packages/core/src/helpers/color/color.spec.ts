import { describe, expect, it } from '@jest/globals';
import { color } from './color';

describe('color', () => {
  describe('theme', () => {
    it('should return the correct rgba value', () => {
      const name = 'content-main';

      expect(color(name)).toBe(`rgba(var(--ods-color-${name}))`);
    });
  });

  describe('palette', () => {
    it('should return the correct rgba value', () => {
      const name = 'primary-500';
      const opacity = 0.5;

      expect(color(name, opacity)).toBe(
        `rgba(var(--ods-color-${name}), ${opacity})`
      );
    });

    it('should work without opacity', () => {
      const name = 'primary-500';

      expect(color(name)).toBe(`rgba(var(--ods-color-${name}))`);
    });
  });
});
