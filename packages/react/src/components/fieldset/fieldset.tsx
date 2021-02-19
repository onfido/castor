import { c, classy } from '@onfido/castor';
import React from 'react';

export const Fieldset = ({
  className,
  ...restProps
}: FieldsetProps): JSX.Element => (
  <fieldset {...restProps} className={classy(c('fieldset'), className)} />
);

export type FieldsetProps = JSX.IntrinsicElements['fieldset'];
