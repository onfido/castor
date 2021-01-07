import { c, classy, DescriptionProps as BaseProps, m } from '@onfido/castor';
import React from 'react';

/**
 * @note Intended to be used within Radio component.
 */
export const Description = ({
  disabled,
  children,
  className,
  ...restProps
}: DescriptionProps): JSX.Element => (
  <span
    {...restProps}
    className={classy(c('description'), m({ disabled }), className)}
  >
    {children}
  </span>
);

export type DescriptionProps = BaseProps & JSX.IntrinsicElements['span'];
