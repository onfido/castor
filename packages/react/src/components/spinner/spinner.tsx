import { c, classy, m, SpinnerProps as BaseProps } from '@onfido/castor';
import React from 'react';

export const Spinner = ({
  size = 'large',
  children,
  className,
  ...restProps
}: SpinnerProps): JSX.Element => (
  <div {...restProps} className={classy(c('spinner'), m(size), className)}>
    {children}
  </div>
);

export type SpinnerProps = BaseProps & JSX.IntrinsicElements['div'];
