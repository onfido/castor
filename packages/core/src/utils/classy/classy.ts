export type ClassName = string | null | undefined;
export type ClassNameRecord = Record<string, boolean | null | undefined>;
export type ClassNames = ClassName | ClassName[] | ClassNameRecord;

/**
 * Generates a `className` based on the specified values.
 *
 * Supports multiple types, see example.
 *
 * @example
 * const styles = { foo: 'foo-1g4k53' };
 * const globalClasses = ['global-1', 'global-2'];
 * const className = 'className';
 * const disabled = true;
 * const invalid = false;
 *
 * classy(styles.foo, globalClasses, className, { disabled, invalid });
 * // 'foo-1g4k53 global-1 global-2 className disabled'
 */
export const classy = (...classNames: ClassNames[]) =>
  classNames.flat(10).flatMap(truthyNames).join(' ');

/**
 * Prefixes component names with a predetermined identifier.
 *
 * @param components Names to prefix.
 *
 * @example
 * c('button');
 * // ['ods-button']
 */
export const c = withPrefix('ods-');

/**
 * Prefixes modifier names with a predetermined identifier.
 *
 * @param modifiers Names to prefix.
 *
 * @example
 * m('action', 'primary');
 * // ['-action', '-primary']
 */
export const m = withPrefix('-');

const truthyNames = (value: ClassName | ClassNameRecord) =>
  (value instanceof Object
    ? Object.entries(value)
        .filter(([, value]) => !!value)
        .map(([key]) => key)
    : [value]
  ).filter(Boolean);

function withPrefix(prefix: string) {
  return (...classNames: (ClassName | ClassNameRecord)[]) =>
    classNames.flatMap(truthyNames).map((name) => `${prefix}${name}`);
}
