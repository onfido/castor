import { c, classy } from '@onfido/castor';
import { useField } from '@onfido/castor-react';
import React from 'react';

export function Fieldset({
  className,
  ...restProps
}: FieldsetProps): JSX.Element {
  const { disabled } = useField();

  return (
    <fieldset
      disabled={disabled} // will be overriden by props if set
      {...restProps}
      className={classy(c('fieldset'), className)}
    />
  );
}

export type FieldsetProps = JSX.IntrinsicElements['fieldset'];
