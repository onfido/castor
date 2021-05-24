import { c, classy } from '@onfido/castor';
import { html } from '../../../../../docs';

export interface AsteriskProps {
  'aria-label': string;
}

/**
 * Use in `field-label` to denote required fields.
 */
export const Asterisk = (props: AsteriskProps) =>
  html('abbr', {
    ...props,
    children: ' *',
    class: classy(c('asterisk')),
  });
