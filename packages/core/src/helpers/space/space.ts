/**
 * Returns the `px` size of a multiplier of the base space.
 *
 * Only integers and (1.5, 0.5, 0.25, 0.125) are supported.
 *
 * @param multiplier How much to multiply the base.
 *
 * @example
 * space(4);
 * // '32px'
 */
export function space(multiplier: number): string {
  if (!isAllowed(multiplier))
    throw new Error(`"multiplier" must be an integer or (${allowedFloats})`);

  return `${multiplier * base}px`;
}

const allowedFloats = new Set([1.5, 0.5, 0.25, 0.125]);
allowedFloats.toString = () => [...allowedFloats].join(', ');

const base = 8;

const isAllowed = (multiplier: number) =>
  Number.isInteger(multiplier) || allowedFloats.has(multiplier);
