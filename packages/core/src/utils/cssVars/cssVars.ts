/**
 * Generates a plain object of CSS variable key/value pairs based on the
 * specified `vars`.
 *
 * @note Filters out falsy values and transforms names to kebab-case.
 *
 * @example
 * const foo = 'foo';
 * const isBar = 'bar';
 * const zed = '';
 *
 * cssVars({ foo, isBar, zed });
 * // { --foo: 'foo', --is-bar: 'bar' }
 */
export const cssVars = <V extends Value>(vars: Vars<V>): Vars<V> =>
  Object.fromEntries(
    Object.entries(vars)
      .filter(([, value]) => !!value)
      .map(([name, value]) => [toVar(name), value])
  );

const toVar = (name: string) => `--${toKebabCase(name)}`;

const toKebabCase = (name: string) =>
  name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

type Vars<V> = Record<string, V>;
type Value = string | number | undefined | null;
