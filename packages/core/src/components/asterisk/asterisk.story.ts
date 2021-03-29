import { html } from '../../../../../docs';
import { c, classy } from '../../utils';

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
