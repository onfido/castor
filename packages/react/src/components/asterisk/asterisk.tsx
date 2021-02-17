import { c, classy } from '@onfido/castor';
import React from 'react';

/**
 * Use in `FieldLabel` to denote required fields.
 */
export const Asterisk = ({
  className,
  ...restProps
}: AsteriskProps): JSX.Element => (
  <abbr {...restProps} className={classy(c('asterisk'), className)}>
    {' *'}
  </abbr>
);

export type AsteriskProps = Omit<JSX.IntrinsicElements['abbr'], 'children'> & {
  'aria-label': string;
};
