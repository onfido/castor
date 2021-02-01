import { combinations } from './combinations';
import { Entries, Entry } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getEntries<Props extends Record<string, any>>(
  props: Entries<Props>
): Entry<Props>[] {
  type Key = keyof Props;
  type Value = Props[Key];

  return Object.entries(props)
    .map(
      ([prop, values]: [Key, Value[]]) =>
        values.map((value) => [prop, value]) as [Key, Value][][]
    )
    .reduce(combinations, [])
    .map(Object.fromEntries);
}
