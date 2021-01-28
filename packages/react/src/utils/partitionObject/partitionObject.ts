import { partition } from '../partition/partition';

/**
 * Partitions an `object` in two with entries that satisfy the `predicate` then
 * those that don't, respectively.
 *
 * @param object Object to be partitioned.
 * @param predicate Function that determines in where to put each entry.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function partitionObject<T extends Record<string, any>>(
  object: T,
  predicate: (entry: [keyof T, T[keyof T]], index: number) => boolean
) {
  const entries = Object.entries(object);
  const parts = partition(entries, predicate);

  return parts.map(Object.fromEntries);
}
