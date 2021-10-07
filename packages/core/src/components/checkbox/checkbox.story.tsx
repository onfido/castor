import { c, CheckboxProps as BaseProps, classy, m } from '@onfido/castor';
import { html } from '../../../../../docs';

export interface CheckboxProps extends BaseProps {
  children?: string | null;
  disabled?: boolean;
}

export const Checkbox = ({
  bordered,
  children,
  invalid,
  ...props
}: CheckboxProps) =>
  html('label', {
    class: classy(c('input-label'), m({ bordered })),
    children: [
      html('input', {
        ...props,
        class: classy(c('checkbox'), m({ invalid })),
        type: 'checkbox',
      }),
      html('span', {
        'aria-hidden': 'true',
        class: classy(c('input-indicator')),
      }),
      children && html('span', { children }),
    ],
  });
