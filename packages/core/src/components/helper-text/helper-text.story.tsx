import { HelperTextProps as BaseProps, m } from '@onfido/castor';
import { html } from '../../../../../docs';
import { c, classy } from '../../utils';

export interface HelperTextProps extends BaseProps {
  children: string | string[];
}

/**
 * Intended to be used with field components, incl. `field-label` itself.
 */
export const HelperText = ({ disabled, ...props }: HelperTextProps) =>
  html('span', {
    ...props,
    class: classy(c('helper-text'), m({ disabled })),
  });
