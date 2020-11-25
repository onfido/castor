import React from 'react';
import { c, classy, m, InputProps as BaseProps } from '@onfido/castor';

export const Input = ({
  type = 'text',
  invalid,
  className,
  ...restProps
}: InputProps): JSX.Element => (
  <input
    {...restProps}
    type={type}
    className={classy(c`input`, m({ invalid }), className)}
  />
);

export type InputProps = BaseProps & JSX.IntrinsicElements['input'];
