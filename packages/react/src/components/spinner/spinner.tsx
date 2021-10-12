import { c, classy, m, SpinnerProps as BaseProps } from '@onfido/castor';
import React from 'react';
import { withRef } from '../../utils';

export const Spinner = withRef(function Spinner(
  { size = 'medium', children, className, ...restProps }: SpinnerProps,
  ref: SpinnerProps['ref']
) {
  return (
    <div
      {...restProps}
      ref={ref}
      className={classy(c('spinner'), m(size), className)}
    >
      {children}
    </div>
  );
});

export type SpinnerProps = BaseProps & JSX.IntrinsicElements['div'];
