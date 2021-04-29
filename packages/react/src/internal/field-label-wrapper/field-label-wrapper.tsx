import { FieldLabel } from '@onfido/castor-react';
import React from 'react';

/**
 * Wrapper for `Input` and `Textarea` components, using `FieldLabel` when
 * children is provided.
 */
export const FieldLabelWrapper = ({
  id,
  children: { element, children },
}: FieldLabelWrapperProps): JSX.Element => {
  if (!children) return element;

  return (
    <FieldLabel htmlFor={id}>
      <span>{children}</span>
      {element}
    </FieldLabel>
  );
};

export interface FieldLabelWrapperProps {
  id: InputElementProps['id'] | TextareaElementProps['id'];
  children: {
    children: InputElementProps['children'] | TextareaElementProps['children'];
    element: JSX.Element;
  };
}

type InputElementProps = JSX.IntrinsicElements['input'];
type TextareaElementProps = JSX.IntrinsicElements['textarea'];
