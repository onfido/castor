import { combine } from './combine';

/**
 * Reducer to create a combination matrix of several lists.
 *
 * @example
 * [[1, 2], ['a', 'b'], [true, false]].reduce(combinations, []);
 * // [
 * //   [1, 'a', true],   [1, 'a', false],
 * //   [1, 'b', true],   [1, 'b', false],
 * //   [2, 'a', true],   [2, 'a', false],
 * //   [2, 'b', true],   [2, 'b', false],
 * // ]
 */
export const combinations = <T extends unknown[]>(all: T, next: T): T =>
  // first iteration initialiser:
  // if `all` is an empty array use a placeholder
  combine(all.length ? all : [[]], next)
    // flatten the first element in the tuple
    .map(([f, s]) => [...(f as unknown[]), s]) as T;
