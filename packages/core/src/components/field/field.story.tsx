import { c, classy } from '@onfido/castor';
import { html } from '../../../../../docs';

export interface FieldProps {
  children?: string | string[] | null;
}

/**
 * Use to wrap any input component (`input`, `textarea`, `radio`, `checkbox`).
 */
export const Field = (props: FieldProps) =>
  html('div', {
    ...props,
    class: classy(c('field')),
  });
