import { c, classy } from '@onfido/castor';
import { Icon } from '@onfido/castor-react';
import React from 'react';

/**
 * Intended to be used alongside field components.
 *
 * `Validation` when `withIcon` prop is enabled uses an `Icon` component that
 * requires `Icons` (SVG sprite) to be included in your app.
 *
 * https://github.com/onfido/castor-icons#use-with-plain-code
 */
export const Validation = ({
  withIcon,
  children,
  className,
  ...restProps
}: ValidationProps): JSX.Element => (
  <div {...restProps} className={classy(c('validation'), className)}>
    {withIcon && <Icon name="error" />}
    {children}
  </div>
);

export type ValidationProps = JSX.IntrinsicElements['div'] & {
  withIcon?: boolean;
};
