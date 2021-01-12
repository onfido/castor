import { c, classy, InputProps as BaseProps, m } from '@onfido/castor';
import React from 'react';
import { withRef } from '../../utils';

export const Input = withRef(
  (
    { type = 'text', invalid, className, ...restProps }: InputProps,
    ref: InputProps['ref']
  ): JSX.Element => (
    <input
      {...restProps}
      ref={ref}
      type={type}
      className={classy(c('input'), m({ invalid }), className)}
    />
  )
);
Input.displayName = 'Input';

export type InputProps = BaseProps &
  Omit<JSX.IntrinsicElements['input'], 'children'>;
