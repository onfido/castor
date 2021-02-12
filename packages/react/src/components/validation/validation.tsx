import { c, classy } from '@onfido/castor';
import { Icon } from '@onfido/castor-react';
import React from 'react';

/**
 * Intended to be used alongside field components.
 *
 * `Validation` uses an `Icon` that requires `Icons` (SVG sprite) to be included
 * in your app.
 *
 * https://github.com/onfido/castor-icons#use-with-plain-code
 */
export const Validation = ({
  showIcon,
  children,
  className,
  ...restProps
}: ValidationProps): JSX.Element => (
  <div {...restProps} className={classy(c('validation'), className)}>
    {showIcon && <Icon name="error" />}
    {children}
  </div>
);

export type ValidationProps = JSX.IntrinsicElements['div'] & {
  showIcon?: boolean;
};
