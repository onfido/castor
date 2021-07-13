import { describe, expect, it } from '@jest/globals';
import { font } from './font';

describe('font', () => {
  const defaultFont = {
    fontFamily: 'inherit',
    fontSize: 'initial',
    fontWeight: 'initial',
    lineHeight: 'initial',
    textTransform: 'none',
  };

  it('should allow selection by size only', () => {
    expect(font('600-regular')).toStrictEqual({
      ...defaultFont,
      fontSize: '1.875rem',
      fontWeight: 400,
      lineHeight: '2.5rem',
    });
  });

  it('should allow selection by size and type', () => {
    expect(font('400-allcaps')).toStrictEqual({
      ...defaultFont,
      fontSize: '1.25rem',
      lineHeight: '1.5rem',
      textTransform: 'uppercase',
    });
  });

  it('should stringify correctly to CSS', () => {
    expect(`${font('400-allcaps')}`).toBe(
      [
        'font-family: inherit;',
        'font-size: 1.25rem;',
        'font-weight: initial;',
        'line-height: 1.5rem;',
        'text-transform: uppercase;',
      ].join('\n')
    );
  });
});
