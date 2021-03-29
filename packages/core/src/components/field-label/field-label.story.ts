import { html } from '../../../../../docs';
import { c, classy } from '../../utils';

export interface FieldLabelProps {
  children: string | string[];
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
