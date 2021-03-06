import { toCSS } from '@onfido/castor';
import { Properties } from 'csstype';

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

  // can't be enumerable otherwise it breaks CSS-in-JS
  Object.defineProperty(styles, 'toString', { value: () => toCSS(styles) });

  return styles;
}

export type Font = Pick<
  Properties<string | number>,
  `font${'Family' | 'Size' | 'Weight'}` | 'lineHeight' | 'textTransform'
>;

export type FontName =
  | `${FontSize}-bold`
  | `${FontSize}-regular`
  | `${Extract<FontSize, '800' | '700' | '600' | '500'>}-light`
  | `${Extract<FontSize, '400' | '300' | '200' | '100'>}-allcaps`
  | `${Extract<FontSize, '400' | '300' | '200'>}-mono`;

type FontSize = keyof typeof sizes;

const sizes = {
  '800': { fontSize: '3.375rem', lineHeight: '4rem' },
  '700': { fontSize: '2.875rem', lineHeight: '3.5rem' },
  '600': { fontSize: '1.875rem', lineHeight: '2.5rem' },
  '500': { fontSize: '1.5rem', lineHeight: '2rem' },
  '400': { fontSize: '1.25rem', lineHeight: '1.5rem' },
  '300': { fontSize: '1rem', lineHeight: '1.5rem' },
  '200': { fontSize: '0.875rem', lineHeight: '1.5rem' },
  '100': { fontSize: '0.75rem', lineHeight: '1rem' },
};

type FontType = keyof typeof types;

const types = {
  bold: { fontWeight: 500 },
  regular: { fontWeight: 400 },
  light: { fontWeight: 300 },
  allcaps: { textTransform: 'uppercase' },
  mono: { fontFamily: '"Roboto Mono", Consolas, Menlo, monospace' },
};
