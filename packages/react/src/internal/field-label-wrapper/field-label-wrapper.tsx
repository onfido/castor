import { FieldLabel } from '@onfido/castor-react';
import React from 'react';

/**
 * Wrapper for `Input` and `Textarea` components, using `FieldLabel` when
 * children is provided.
 */
export const FieldLabelWrapper = ({
  htmlFor,
  children: { element, children },
}: FieldLabelWrapperProps): JSX.Element => {
  if (!children) return element;

  return (
    <FieldLabel htmlFor={htmlFor}>
      <span>{children}</span>
      {element}
    </FieldLabel>
  );
};

export interface FieldLabelWrapperProps {
  htmlFor: LabelElementProps['htmlFor'];
  children: {
    children: InputElementProps['children'] | TextareaElementProps['children'];
    element: JSX.Element;
  };
}

type LabelElementProps = JSX.IntrinsicElements['label'];
type InputElementProps = JSX.IntrinsicElements['input'];
type TextareaElementProps = JSX.IntrinsicElements['textarea'];
