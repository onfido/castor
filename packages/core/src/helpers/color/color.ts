/**
 * Returns the rgba value of a specified color (alias).
 *
 * @param name The name of a color (alias).
 *
 * @example
 * color('content-main');
 * // 'rgba(var(--color-content-main))'
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
 * // 'rgba(var(--color-primary-500), 0.5)'
 */
export function color(name: Palette, opacity?: number): string;

export function color(name: Color, opacity?: number): string {
  return opacity
    ? `rgba(var(--color-${name}), ${opacity})`
    : `rgba(var(--color-${name}))`;
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

type NeutralColor =
  | 'neutral-900'
  | 'neutral-800'
  | 'neutral-700'
  | 'neutral-600'
  | 'neutral-500'
  | 'neutral-400'
  | 'neutral-300'
  | 'neutral-200'
  | 'neutral-050'
  | 'neutral-white'
  | 'neutral-black';

type PrimaryColor =
  | 'primary-700'
  | 'primary-600'
  | 'primary-500'
  | 'primary-400'
  | 'primary-300'
  | 'primary-200'
  | 'primary-100'
  | 'primary-050'
  | 'primary-muted-600'
  | 'primary-muted-300';

type AccentColor =
  | 'accent-1-600'
  | 'accent-1-500'
  | 'accent-1-400'
  | 'accent-2-600'
  | 'accent-2-500'
  | 'accent-2-400'
  | 'accent-3-600'
  | 'accent-3-500'
  | 'accent-3-400';

type SuccessColor =
  | 'success-600'
  | 'success-500'
  | 'success-400'
  | 'success-300'
  | 'success-200'
  | 'success-100'
  | 'success-050'
  | 'success-vivid-300'
  | 'success-muted-500'
  | 'success-muted-300';

type InfoColor =
  | 'info-700'
  | 'info-600'
  | 'info-500'
  | 'info-400'
  | 'info-300'
  | 'info-200'
  | 'info-100'
  | 'info-050'
  | 'info-muted-600'
  | 'info-muted-300';

type WarningColor =
  | 'warning-600'
  | 'warning-500'
  | 'warning-400'
  | 'warning-300'
  | 'warning-200'
  | 'warning-100'
  | 'warning-050'
  | 'warning-vivid-300'
  | 'warning-muted-500'
  | 'warning-muted-300';

type ErrorColor =
  | 'error-600'
  | 'error-500'
  | 'error-400'
  | 'error-300'
  | 'error-200'
  | 'error-100'
  | 'error-050'
  | 'error-muted-500'
  | 'error-muted-300';

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
  | 'border-focus-inner'
  | 'border-action-focus'
  | 'border-negative-focus'
  | 'border-inverse-action';
