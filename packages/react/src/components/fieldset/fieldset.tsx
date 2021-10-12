import { c, classy } from '@onfido/castor';
import { useField } from '@onfido/castor-react';
import React from 'react';
import { withRef } from '../../utils';

export const Fieldset = withRef(function Fieldset(
  { className, ...restProps }: FieldsetProps,
  ref: FieldsetProps['ref']
) {
  const { disabled } = useField();

  return (
    <fieldset
      disabled={disabled} // will be overriden by props if set
      {...restProps}
      ref={ref}
      className={classy(c('fieldset'), className)}
    />
  );
});

export type FieldsetProps = JSX.IntrinsicElements['fieldset'];
