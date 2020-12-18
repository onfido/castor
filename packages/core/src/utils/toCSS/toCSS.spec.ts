import { describe, expect, it, jest } from '@jest/globals';
import { toCSS } from './toCSS';

jest.mock('../../utils', () => ({
  kebabCase: (s: string) => s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
}));

describe('toCSS', () => {
  it('should transform a style object correctly to CSS', () => {
    expect(
      toCSS({
        fontFamily: 'inherit',
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 'normal',
        textTransform: 'none',
      })
    ).toBe(
      [
        'font-family: inherit;',
        'font-size: 1rem;',
        'font-weight: 400;',
        'line-height: normal;',
        'text-transform: none;',
      ].join('\n')
    );
  });
});
