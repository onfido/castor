import { c, classy, HelperTextProps as BaseProps, m } from '@onfido/castor';
import React from 'react';
import { withRef } from '../../utils';

/**
 * Intended to be used with field components, incl. `FieldLabel` itself.
 */
export const HelperText = withRef(function HelperText(
  { disabled, className, ...restProps }: HelperTextProps,
  ref: HelperTextProps['ref']
) {
  return (
    <span
      {...restProps}
      ref={ref}
      className={classy(c('helper-text'), m({ disabled }), className)}
    />
  );
});

export type HelperTextProps = BaseProps & JSX.IntrinsicElements['span'];
