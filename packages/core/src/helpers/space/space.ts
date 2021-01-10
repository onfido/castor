/**
 * Returns the `px` size of a multiplier of the base space.
 *
 * @param multiplier How much to multiply the base.
 *
 * @example
 * space(4);
 * // '32px'
 */
export function space(multiplier: number): string {
  return `${multiplier * base}px`;
}

const base = 8;
