import { partition } from '../../utils';

/**
 * Splits `Indicator` properties into `label` and `input` props.
 */
export const splitContainerProps = <T extends Input | Label>(props: T) => {
  const entries = Object.entries(props);
  const splitProps = partition(entries, ([key]) => labelProps.test(key));

  return splitProps.map(Object.fromEntries) as [Label, Input];
};

const labelProps = /^aria-|^data-/;

type Input = JSX.IntrinsicElements['input'];
type Label = JSX.IntrinsicElements['label'];
