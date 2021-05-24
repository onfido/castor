import { c, classy } from '@onfido/castor';
import { html } from '../../../../../docs';

/**
 * Use in `field-label` to denote required fields.
 */
export const Asterisk = () =>
  html('abbr', {
    children: ' *',
    class: classy(c('asterisk')),
  });
