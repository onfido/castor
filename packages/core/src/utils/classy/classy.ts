export type ClassName = string | null | undefined;
export type ClassNameRecord = Record<string, boolean | null | undefined>;
export type ClassNames = ClassName | ClassName[] | ClassNameRecord;
type Template = [TemplateStringsArray, ...ClassNames[]];

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
  classNames
    .flat(10)
    .flatMap((className) =>
      className instanceof Object ? getTruthyKeys(className) : className
    )
    .filter(Boolean)
    .join(' ');

/**
 * Prefixes component names with a predetermined identifier.
 *
 * Can be used as tagged template literal, separated by spaces.
 *
 * @param components Names to prefix.
 *
 * @example
 * c('button') || c`button`;
 * // ['ods-button']
 */
export const c = mapWithPrefix('ods-');

/**
 * Prefixes modifier names with a predetermined identifier.
 *
 * Can be used as tagged template literal, separated by spaces.
 *
 * @param modifiers Names to prefix.
 *
 * @example
 * m('action', 'primary') || m`action primary`;
 * // ['-action', '-primary']
 */
export const m = mapWithPrefix('-');

const fromTemplate = (array: Template | ClassNames[]) =>
  isTemplate(array)
    ? array[0]
        .map((value, i) => value + classy(array[i + 1] as ClassNames))
        .join('')
        .split(' ')
    : array;

const getTruthyKeys = (obj: Record<string, unknown>): string[] =>
  Object.entries(obj)
    .filter(([, value]) => !!value)
    .map(([key]) => key);

const isTemplate = (template: Template | unknown[]): template is Template =>
  Array.isArray(template[0]) &&
  Array.isArray(((template[0] as unknown) as TemplateStringsArray).raw);

const mapKey = <V>(
  obj: Record<string, V>,
  mapFn: (key: string) => string
): Record<string, V> =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [mapFn(key), value])
  );

function mapWithPrefix(prefix: string) {
  return (...array: ClassNames[] | Template) =>
    fromTemplate(array)
      .flat(10)
      .filter(Boolean)
      .flatMap((className) =>
        className instanceof Object
          ? getTruthyKeys(mapKey(className, (key) => `${prefix}${key}`))
          : `${prefix}${className}`
      );
}
