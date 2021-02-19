import { c, classy } from '@onfido/castor';
import React from 'react';

/**
 * Intended to be used within `Fieldset` component, providing a text legend.
 */
export const FieldsetLegend = ({
  className,
  ...restProps
}: FieldsetLegendProps): JSX.Element => (
  <legend {...restProps} className={classy(c('fieldset-legend'), className)} />
);

export type FieldsetLegendProps = JSX.IntrinsicElements['legend'];
