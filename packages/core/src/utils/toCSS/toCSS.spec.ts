import { describe, expect, it } from '@jest/globals';
import { toCSS } from './toCSS';

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
