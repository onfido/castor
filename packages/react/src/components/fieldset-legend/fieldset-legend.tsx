import { c, classy } from '@onfido/castor';
import React from 'react';
import { withRef } from '../../utils';

/**
 * Use within `Fieldset` component to provide a text legend.
 */
export const FieldsetLegend = withRef(function FieldsetLegend(
  { className, ...restProps }: FieldsetLegendProps,
  ref?: FieldsetLegendProps['ref']
) {
  return (
    <legend
      {...restProps}
      ref={ref}
      className={classy(c('fieldset-legend'), className)}
    />
  );
});

export type FieldsetLegendProps = JSX.IntrinsicElements['legend'];
