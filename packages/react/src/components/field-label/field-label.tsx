import { c, classy } from '@onfido/castor';
import React from 'react';

/**
 * Intended to be used alongside `Input` and `Textarea` components, connecting
 * via the "htmlFor" prop.
 */
export const FieldLabel = ({
  className,
  ...restProps
}: FieldLabelProps): JSX.Element => (
  <label {...restProps} className={classy(c('field-label'), className)} />
);

export type FieldLabelProps = JSX.IntrinsicElements['label'];
