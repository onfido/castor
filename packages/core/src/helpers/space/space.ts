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
    throw new Error(
      `"multiplier" must be an integer or (${floats}). Got: ${multiplier}`
    );

  return `${multiplier * base}px`;
}

const allowedFractionals = new Set([1.5, 0.5, 0.25, 0.125]);
const base = 8;
const floats = [...allowedFractionals].join(', ');

const isAllowed = (multiplier: number) =>
  Number.isInteger(multiplier) || allowedFractionals.has(multiplier);
