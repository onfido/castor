/**
 * Transforms a `Font` style object into a valid CSS string.
 *
 * @param font Font to transform to CSS.
 */
import { Font } from '../../helpers';
import { kebabCase } from '../kebabCase/kebabCase';

export const toCSS = (font: Font) =>
  Object.entries(font)
    .map(([key, value]) => `${kebabCase(key)}: ${value};`)
    .join('\n')
    .replace(/"|'/g, '');
