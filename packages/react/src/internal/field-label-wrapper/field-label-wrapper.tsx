import { FieldLabel } from '@onfido/castor-react';
import React from 'react';

/**
 * Wrapper for `Input` and `Textarea` components, using `FieldLabel` when
 * `label` prop is provided.
 */
export const FieldLabelWrapper = ({
  id,
  children: { element, label },
}: FieldLabelWrapperProps): JSX.Element => {
  if (!label) return element;

  return (
    <FieldLabel htmlFor={id}>
      <span>{label}</span>
      {element}
    </FieldLabel>
  );
};

export interface FieldLabelWrapperProps {
  id: InputElementProps['id'] | TextareaElementProps['id'];
  children: {
    element: JSX.Element;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    label: any;
  };
}

type InputElementProps = JSX.IntrinsicElements['input'];
type TextareaElementProps = JSX.IntrinsicElements['textarea'];
