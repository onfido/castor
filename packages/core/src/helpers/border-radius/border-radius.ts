import { BorderRadius } from '@onfido/castor';

/**
 * Returns the border-radius CSS var of a specified size.
 *
 * @example
 * borderRadius('medium');
 * // 'var(--ods-border-radius-medium)'
 */
export function borderRadius(size: BorderRadius) {
  return `var(--ods-border-radius-${size})`;
}
