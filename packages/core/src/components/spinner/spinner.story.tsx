import { c, classy, m, SpinnerProps as BaseProps } from '@onfido/castor';
import { html } from '../../../../../docs';

export interface SpinnerProps extends BaseProps {
  children: string;
}

export const Spinner = ({ size, ...props }: SpinnerProps) =>
  html('div', {
    ...props,
    class: classy(c('spinner'), m(size)),
  });
