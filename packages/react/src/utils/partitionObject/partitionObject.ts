/**
 * Partitions an `object` in two with entries that satisfy the `predicate` then
 * those that don't, respectively.
 *
 * @param object Object to be partitioned.
 * @param predicate Function that determines in where to put each entry.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const partitionObject = <T extends Record<string, any>>(
  object: T,
  predicate: (entry: [keyof T, T[keyof T]], index: number) => boolean
) =>
  Object.entries(object).reduce(
    (tuple, [key, value]: [keyof T, T[keyof T]], index) => {
      const which = predicate([key, value], index) ? 0 : 1;
      tuple[which][key] = value;
      return tuple;
    },
    [{}, {}] as [Partial<T>, Partial<T>]
  );
