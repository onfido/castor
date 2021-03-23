import { InputProps as BaseProps } from '@onfido/castor';
import { html } from '../../../../../docs';
import { c, classy, m } from '../../utils';

export interface InputProps extends BaseProps {
  value?: string;
}

export const Input = ({ type, invalid, ...props }: InputProps) =>
  html('input', {
    ...props,
    class: classy(c('input'), m({ invalid })),
    type,
  });
