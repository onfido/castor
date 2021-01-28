import { partitionObject } from '../../utils';

/**
 * Splits `Indicator` properties into `label` and `input` props.
 */
export const splitContainerProps = (props: Input | Label) =>
  partitionObject(props, ([key]) => containerProps.test(key));

const containerProps = /^aria-|^data-/;

type Input = JSX.IntrinsicElements['input'];
type Label = JSX.IntrinsicElements['label'];
