import { c, classy } from '@onfido/castor';
import React from 'react';

/**
 * Intended to be used with `FieldLabel` component.
 */
export const Asterisk = ({
  className,
  ...restProps
}: AsteriskProps): JSX.Element => (
  <abbr {...restProps} className={classy(c('asterisk'), className)}>
    &nbsp;{'*'}
  </abbr>
);

export type AsteriskProps = Omit<JSX.IntrinsicElements['abbr'], 'children'> & {
  'aria-label': string;
};
