import { c, classy, InputProps as BaseProps, m } from '@onfido/castor';
import React from 'react';

export const Input = ({
  type = 'text',
  invalid,
  className,
  ...restProps
}: InputProps): JSX.Element => (
  <input
    {...restProps}
    type={type}
    className={classy(c('input'), m({ invalid }), className)}
  />
);

export type InputProps = BaseProps & JSX.IntrinsicElements['input'];
