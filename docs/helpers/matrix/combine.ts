/**
 * Collects all distinct combinations of members of both lists.
 * - https://en.wikipedia.org/wiki/Combination
 * - https://ramdajs.com/docs/#xprod
 *
 * @example
 * combine([1, 2], ['a', 'b']);
 * // [
 * //   [1, 'a'],
 * //   [1, 'b'],
 * //   [2, 'a'],
 * //   [2, 'b'],
 * // ]
 */
export const combine = <A, B>(arrayA: A[], arrayB: B[]): [A, B][] =>
  arrayA.reduce(
    (all, a) => all.concat(arrayB.map((b) => [a, b])),
    [] as [A, B][]
  );
