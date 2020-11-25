/**
 * Returns the border-radius CSS var of a specified size.
 *
 * @example
 * borderRadius('medium');
 * // 'var(--border-radius-medium)'
 */
export function borderRadius(size: BorderRadius) {
  return `var(--border-radius-${size})`;
}

export type BorderRadius = 'small' | 'medium' | 'large' | 'full';
