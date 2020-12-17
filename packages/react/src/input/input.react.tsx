import { c, classy, InputProps as BaseProps, m } from '@onfido/castor';
import React from 'react';
import { withRef } from '../utils';

export const Input = withRef(
  (
    { type = 'text', invalid, className, ...restProps }: InputProps,
    ref: InputProps['ref']
  ) => (
    <input
      {...restProps}
      ref={ref}
      type={type}
      className={classy(c('input'), m({ invalid }), className)}
    />
  )
);

export type InputProps = BaseProps & JSX.IntrinsicElements['input'];
