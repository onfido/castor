/**
 * Partitions an `array` in two with elements that satisfy the `predicate`
 * then those that don't, respectively.
 */
export const partition = <T>(
  array: T[],
  predicate: (item: T, index: number) => boolean
) =>
  array.reduce(
    (tuple, item, index) => {
      const which = predicate(item, index) ? 0 : 1;
      tuple[which].push(item);
      return tuple;
    },
    [[], []] as [T[], T[]]
  );
