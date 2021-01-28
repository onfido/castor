import { partitionObject } from '../../utils';

/**
 * Splits `Indicator` properties into `label` and `input` props.
 */
export const splitContainerProps = (
  props: InputElementProps | LabelElementProps
) => partitionObject(props, ([key]) => containerProps.test(key));

const containerProps = /^aria-|^data-/;

type InputElementProps = JSX.IntrinsicElements['input'];
type LabelElementProps = JSX.IntrinsicElements['label'];
