/**
 * Returns the time interval of a multiplier of the base space.
 *
 * @note The value references the CSS variable, it is not in any metric measure.
 *
 * @param multiplier How much to multiply the base. Must be greater than 0.
 *
 * @example
 * time(4);
 * // 'calc(var(--ods-transition-duration) * 4)'
 */
export function time(multiplier: number): string {
  return `calc(${base} * ${multiplier})`;
}

const base = 'var(--ods-transition-duration)';
