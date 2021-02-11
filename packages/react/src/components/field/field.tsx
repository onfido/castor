import { c, classy } from '@onfido/castor';
import React from 'react';

/**
 * Intended to wrap `Input` and `Textarea` components, so that `FieldLabel` and
 * `Validation` can wrap nicely following the minimum content allowed.
 */
export const Field = ({ className, ...restProps }: FieldProps): JSX.Element => (
  <div {...restProps} className={classy(c('field'), className)} />
);

export type FieldProps = JSX.IntrinsicElements['div'];
