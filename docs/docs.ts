/**
 * Creates an object that disables the specified `argTypes`'s controls on the
 * @storybook/docs.
 *
 * @param argTypes ArgTypes to disable.
 *
 * @example
 * export default {
 *   title: 'Foo/Bar',
 *   component: Bar,
 *   argTypes: {
 *     ...disable<BarProps>('myProp', 'anotherProp'),
 *     // myProp: { control: { disable: true } }
 *     // anotherProp: { control: { disable: true } }
 *   },
 * };
 */
export const disable = <Props>(...argTypes: readonly (keyof Props)[]) =>
  create('control', argTypes) as Disable<typeof argTypes>;

/**
 * Creates an object that omits the specified `types` on the @storybook/docs
 * table.
 *
 * @param argTypes ArgTypes to omit.
 *
 * @example
 * export default {
 *   title: 'Foo/Bar',
 *   component: Bar,
 *   argTypes: {
 *     ...omit<BarProps>('myProp', 'anotherProp'),
 *     // myProp: { table: { disable: true } }
 *     // anotherProp: { table: { disable: true } }
 *   },
 * };
 */
export const omit = <Props>(...argTypes: readonly (keyof Props)[]) =>
  create('table', argTypes) as Omit<typeof argTypes>;

const create = <Props>(
  which: 'control' | 'table',
  argTypes: readonly (keyof Props)[]
) =>
  Object.fromEntries(
    argTypes.map((type) => [type, { [which]: { disable: true } }])
  ) as Record<keyof Props, DisabledControl | Omitted>;

type DisabledControl = { control: { disable: true } };
type Omitted = { table: { disable: true } };

type Arr = readonly (string | number | symbol)[];
type Disable<ArgTypes extends Arr> = Record<ArgTypes[number], DisabledControl>;
type Omit<ArgTypes extends Arr> = Record<ArgTypes[number], Omitted>;
