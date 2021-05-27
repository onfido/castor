import { c, classy } from '@onfido/castor';
import { html } from '../../../../../docs';

export interface FieldLabelProps {
  children?: string | string[] | null;
  for?: string;
}

/**
 * Intended to be used alongside `input` and `textarea` components, providing a
 * text label for the field.
 */
export const FieldLabel = (props: FieldLabelProps) =>
  html('label', {
    ...props,
    class: classy(c('field-label')),
  });
