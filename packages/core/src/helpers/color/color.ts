import { Color, ColorPalette } from '@onfido/castor';

/**
 * Returns the rgba value of a specified (palette or theme) color.
 *
 * @param name The name of a (palette or theme) color.
 *
 * @example
 * color('content-main');
 * // 'rgba(var(--ods-color-content-main))'
 */
export function color(name: Color): string;
/**
 * Returns the rgba value of a specified palette color.
 *
 * @param name The name of a palette color.
 * @param opacity The alpha channel, a value between 0 and 1 that represents the
 * point in the range from completely transparent to completely solid.
 *
 * @example
 * color('primary-500', 0.5);
 * // 'rgba(var(--ods-color-primary-500), 0.5)'
 */
export function color(name: ColorPalette, opacity?: number): string;

export function color(name: Color, opacity?: number): string {
  return opacity
    ? `rgba(var(--ods-color-${name}), ${opacity})`
    : `rgba(var(--ods-color-${name}))`;
}
