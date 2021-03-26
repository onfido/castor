import { html } from '../../../../../docs';
import { c, classy } from '../../utils';

export interface FieldProps {
  children: string | string[];
}

/**
 * Use to wrap any input component (`input`, `textarea`, `radio`, `checkbox`).
 */
export const Field = (props: FieldProps) =>
  html('div', {
    ...props,
    class: classy(c('field')),
  });
