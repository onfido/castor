import { c, classy } from '@onfido/castor';
import React from 'react';
import { withRef } from '../../utils';
import { useField } from '../field/useField';

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
