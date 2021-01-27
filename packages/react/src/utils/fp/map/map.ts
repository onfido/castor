/**
 * Transforms each item in an `array` according to a function `mapFn`.
 * @param mapFn A function that projects each member to its new form.
 */
export const map = <T, R>(mapFn: (item: T, index: number) => R) => (
  array: T[]
) => array.map(mapFn);
