import { c, classy } from '@onfido/castor';
import React from 'react';
import { withRef } from '../../utils';

/**
 * Intended to be used within `Input` and `Textarea` components, providing a
 * text label for the field.
 *
 * Can also be used alongside these two components, but should then be connected
 * via the "htmlFor" prop.
 */
export const FieldLabel = withRef(function FieldLabel(
  { className, ...restProps }: FieldLabelProps,
  ref?: FieldLabelProps['ref']
) {
  return (
    <label
      {...restProps}
      ref={ref}
      className={classy(c('field-label'), className)}
    />
  );
});

export type FieldLabelProps = JSX.IntrinsicElements['label'];
