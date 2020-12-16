import { describe, expect, it } from '@jest/globals';
import { c, classy, m } from './classy';

describe('classy', () => {
  const falsy = {
    all: [] as any[],
    array: ['', undefined, null],
    object: { a: false, b: null, c: undefined },
  };
  falsy.all = [...falsy.array, falsy.object];

  it('should work with strings', () => {
    const result = classy('foo', 'bar');

    expect(result).toBe('foo bar');
  });

  it('should work with arrays', () => {
    const result = classy(['foo', 'bar'], ['zed']);

    expect(result).toBe('foo bar zed');
  });

  it('should work with objects', () => {
    const result = classy({ foo: true });

    expect(result).toBe('foo');
  });

  it('should ignore falsy values', () => {
    const array = ['1', ...falsy.array, '2'];

    const result = classy('foo', array, falsy.object, { bar: true });

    expect(result).toBe('foo 1 2 bar');
  });

  describe('c', () => {
    it('should apply component prefix', () => {
      const result = c('foo', ...falsy.all, { bar: true, zed: true });

      expect(result.join(' ')).toBe('ods-foo ods-bar ods-zed');
    });
  });

  describe('m', () => {
    it('should apply modifier prefix', () => {
      const result = m('foo', ...falsy.all, { bar: true, zed: true });

      expect(result.join(' ')).toBe('-foo -bar -zed');
    });
  });
});
