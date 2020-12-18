import { Font } from '../../helpers';
import { kebabCase } from '../../utils';

/**
 * Transforms a `Font` style object into a valid CSS string.
 *
 * @param font Font to transform to CSS.
 */
export const toCSS = (font: Font) =>
  Object.entries(font)
    .map(([key, value]) => `${kebabCase(key)}: ${value};`)
    .join('\n')
    .replace(/"|'/g, '');
