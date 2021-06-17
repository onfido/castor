import { describe, expect, it } from '@jest/globals';
import { cssVars } from './cssVars';

describe('cssVars', () => {
  it('should return an object of CSS variable key/value pairs', () => {
    const foo = 'foo';
    const bar = 'bar';

    const result = cssVars({ foo, bar });

    expect(result).toEqual({ ['--foo']: foo, ['--bar']: bar });
  });

  it('should filter out falsy values', () => {
    const foo = '';
    const bar = undefined;

    const result = cssVars({ foo, bar });

    expect(result).toEqual({});
  });

  it('should kebab-case keys', () => {
    const fooBar = 'fooBar';

    const result = cssVars({ fooBar });

    expect(result).toEqual({ ['--foo-bar']: fooBar });
  });
});
