import { c, classy, InputProps as BaseProps, m } from '@onfido/castor';
import React, { forwardRef } from 'react';

export const Input = forwardRef(_Input) as typeof _Input;
function _Input(
  { type = 'text', invalid, className, ...restProps }: InputProps,
  ref: InputProps['ref']
) {
  return (
    <input
      {...restProps}
      ref={ref}
      type={type}
      className={classy(c('input'), m({ invalid }), className)}
    />
  );
}

export type InputProps = BaseProps & JSX.IntrinsicElements['input'];
