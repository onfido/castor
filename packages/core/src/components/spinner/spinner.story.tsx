import { SpinnerProps as BaseProps } from '@onfido/castor';
import { html } from '../../../../../docs';
import { c, classy, m } from '../../utils';

export interface SpinnerProps extends BaseProps {
  children: string;
}

export const Spinner = ({ size = 'large', ...props }: SpinnerProps) =>
  html('div', {
    ...props,
    class: classy(c('spinner'), m(size)),
  });
