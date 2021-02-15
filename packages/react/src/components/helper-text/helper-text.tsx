import { c, classy, HelperTextProps as BaseProps, m } from '@onfido/castor';
import React from 'react';

/**
 * Intended to be used with field components, incl. `FieldLabel` itself.
 */
export const HelperText = ({
  disabled,
  className,
  ...restProps
}: HelperTextProps): JSX.Element => (
  <span
    {...restProps}
    className={classy(c('helper-text'), m({ disabled }), className)}
  />
);

export type HelperTextProps = BaseProps & JSX.IntrinsicElements['span'];
