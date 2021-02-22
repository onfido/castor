import { c, classy } from '@onfido/castor';
import React from 'react';

/**
 * Use within `Fieldset` component to provide a text legend.
 */
export const FieldsetLegend = ({
  className,
  ...restProps
}: FieldsetLegendProps): JSX.Element => (
  <legend {...restProps} className={classy(c('fieldset-legend'), className)} />
);

export type FieldsetLegendProps = JSX.IntrinsicElements['legend'];
