import { map, partition, pipe } from '../../utils';

/**
 * Splits `Indicator` properties into `label` and `input` props.
 */
export const splitContainerProps = <T extends Input | Label>(props: T) =>
  partitionProps(props) as [Partial<Label>, Partial<Input>];

const partitionProps = pipe(
  Object.entries,
  partition(([key]) => labelProps.test(key)),
  map(Object.fromEntries)
);

const labelProps = /^aria-|^data-/;

type Input = JSX.IntrinsicElements['input'];
type Label = JSX.IntrinsicElements['label'];
