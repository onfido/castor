import { c, classy } from '@onfido/castor';
import React from 'react';
import { withRef } from '../../utils';

/**
 * Use in `FieldLabel` to denote required fields.
 */
export const Asterisk = withRef(function Asterisk(
  { className, ...restProps }: AsteriskProps,
  ref: AsteriskProps['ref']
) {
  return (
    <abbr {...restProps} ref={ref} className={classy(c('asterisk'), className)}>
      {' *'}
    </abbr>
  );
});

export type AsteriskProps = Omit<JSX.IntrinsicElements['abbr'], 'children'>;
