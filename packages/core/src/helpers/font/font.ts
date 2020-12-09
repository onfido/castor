import { CSSProperties } from 'react';
import { toCSS } from '../../utils';

/**
 * Returns an object that represents a `Font`.
 *
 * Can be transformed to a CSS string, see example.
 *
 * @param name Font size/type to use.
 *
 * @example
 * styled.div(font('600-regular'));
 *
 * styled.div({
 *   ...font('400-allcaps'),
 *   display: 'flex',
 * });
 *
 * styled.div`${font('600-regular')}`;
 *
 * styled.div`
 *   ${font('400-allcaps')}
 *   display: flex;
 * `;
 */
export function font(name: FontName): Font {
  const [size, type] = name.split('-');

  const styles = {
    fontFamily: 'inherit',
    fontSize: 'initial',
    fontWeight: 'initial',
    lineHeight: 'initial',
    textTransform: 'none',
    ...(size && sizes[size as FontSize]),
    ...(type && types[type as FontType]),
  } as Font;

  return { ...styles, toString: () => toCSS(styles) } as Font;
}

export type Font = Pick<
  CSSProperties,
  'fontFamily' | 'fontSize' | 'fontWeight' | 'lineHeight' | 'textTransform'
>;

export type FontName =
  | '800-bold'
  | '700-bold'
  | '600-bold'
  | '500-bold'
  | '400-bold'
  | '300-bold'
  | '200-bold'
  | '100-bold'
  | '800-regular'
  | '700-regular'
  | '600-regular'
  | '500-regular'
  | '400-regular'
  | '300-regular'
  | '200-regular'
  | '100-regular'
  | '800-light'
  | '700-light'
  | '600-light'
  | '500-light'
  | '400-allcaps'
  | '300-allcaps'
  | '200-allcaps'
  | '100-allcaps'
  | '400-mono'
  | '300-mono'
  | '200-mono';

const sizes = {
  '800': {
    fontSize: '3.375rem',
    lineHeight: '4rem',
  },
  '700': {
    fontSize: '2.875rem',
    lineHeight: '3.5rem',
  },
  '600': {
    fontSize: '1.875rem',
    lineHeight: '2.5rem',
  },
  '500': {
    fontSize: '1.5rem',
    lineHeight: '2rem',
  },
  '400': {
    fontSize: '1.25rem',
    lineHeight: '1.5rem',
  },
  '300': {
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
  '200': {
    fontSize: '0.875rem',
    lineHeight: '1.5rem',
  },
  '100': {
    fontSize: '0.75rem',
    lineHeight: '1rem',
  },
};

type FontSize = '800' | '700' | '600' | '500' | '400' | '300' | '200' | '100';

const types = {
  bold: {
    fontWeight: 500,
  },
  regular: {
    fontWeight: 400,
  },
  light: {
    fontWeight: 300,
  },
  allcaps: {
    textTransform: 'uppercase',
  },
  mono: {
    fontFamily: '"Roboto Mono", monospace',
  },
};

type FontType = 'bold' | 'regular' | 'light' | 'allcaps' | 'mono';
