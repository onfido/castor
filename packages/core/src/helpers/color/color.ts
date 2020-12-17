/**
 * Returns the rgba value of a specified color (alias).
 *
 * @param name The name of a color (alias).
 *
 * @example
 * color('content-main');
 * // 'rgba(var(--ods-color-content-main))'
 */
export function color(name: Color): string;
/**
 * Returns the rgba value of a specified color palette.
 *
 * @param name The name of a color palette.
 * @param opacity The alpha channel, a value between 0 and 1 that represents the
 * point in the range from completely transparent to completely solid.
 *
 * @example
 * color('primary-500', 0.5);
 * // 'rgba(var(--ods-color-primary-500), 0.5)'
 */
export function color(name: Palette, opacity?: number): string;

export function color(name: Color, opacity?: number): string {
  const alpha = opacity ? `, ${opacity}` : '';
  return `rgba(var(--ods-color-${name})${alpha})`;
}

export type Color = ContentColor | BackgroundColor | BorderColor | Palette;

export type Palette =
  | NeutralColor
  | PrimaryColor
  | AccentColor
  | SuccessColor
  | InfoColor
  | WarningColor
  | ErrorColor;

type ColorWeight =
  | '900'
  | '800'
  | '700'
  | '600'
  | '500'
  | '400'
  | '300'
  | '200'
  | '100'
  | '050';

type ColorMuted = `muted-${Extract<ColorWeight, '600' | '300'>}`;
type ColorMutedLight = `muted-${Extract<ColorWeight, '500' | '300'>}`;
type ColorVivid = `vivid-${Extract<ColorWeight, '300'>}`;

type NeutralColor = `neutral-${
  | Exclude<ColorWeight, '100'>
  | 'white'
  | 'black'}`;

type PrimaryColor = `primary-${
  | Exclude<ColorWeight, '900' | '800'>
  | ColorMuted}`;

type AccentColor = `accent-${'1' | '2' | '3'}-${AccentWeight}`;
type AccentWeight = Extract<ColorWeight, '600' | '500' | '400'>;

type SuccessColor = `success-${
  | Exclude<ColorWeight, '900' | '800' | '700'>
  | ColorVivid
  | ColorMutedLight}`;

type InfoColor = `info-${
  | Exclude<ColorWeight, '900' | '800' | '700'>
  | ColorMuted}`;

type WarningColor = `warning-${
  | Exclude<ColorWeight, '900' | '800' | '700'>
  | ColorVivid
  | ColorMutedLight}`;

type ErrorColor = `error-${
  | Exclude<ColorWeight, '900' | '800' | '700'>
  | ColorMutedLight}`;

type ContentColor =
  | 'content-main'
  | 'content-secondary'
  | 'content-action'
  | 'content-placeholder'
  | 'content-disabled'
  | 'content-link'
  | 'content-link-hover'
  | 'content-link-visited'
  | 'content-negative'
  | 'content-warning'
  | 'content-positive'
  | 'content-info'
  | 'content-logo'
  | 'content-inverse-main'
  | 'content-inverse-secondary'
  | 'content-on-action'
  | 'content-on-inverse-action'
  | 'content-always-light'
  | 'content-always-dark';

type BackgroundColor =
  | 'background-main'
  | 'background-surface'
  | 'background-surface-alt'
  | 'background-action'
  | 'background-action-hover'
  | 'background-action-active'
  | 'background-action-subtle'
  | 'background-action-subtle-hover'
  | 'background-disabled'
  | 'background-negative'
  | 'background-negative-hover'
  | 'background-negative-active'
  | 'background-negative-subtle'
  | 'background-negative-subtle-hover'
  | 'background-warning'
  | 'background-warning-subtle'
  | 'background-positive'
  | 'background-positive-subtle'
  | 'background-info'
  | 'background-info-subtle'
  | 'background-input'
  | 'background-input-selected'
  | 'background-overlay'
  | 'background-overlay-subtle'
  | 'background-inverse-main'
  | 'background-inverse-surface'
  | 'background-inverse-action';

type BorderColor =
  | 'border-separator'
  | 'border-input'
  | 'border-input-hover'
  | 'border-action'
  | 'border-action-hover'
  | 'border-action-subtle'
  | 'border-disabled'
  | 'border-negative'
  | 'border-negative-subtle'
  | 'border-warning'
  | 'border-warning-subtle'
  | 'border-positive'
  | 'border-positive-subtle'
  | 'border-info'
  | 'border-info-subtle'
  | 'border-input-selected'
  | 'border-focus-inner'
  | 'border-action-focus'
  | 'border-negative-focus'
  | 'border-inverse-action';
