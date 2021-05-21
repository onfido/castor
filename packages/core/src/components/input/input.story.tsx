import { c, classy, InputProps as BaseProps, m } from '@onfido/castor';
import { html } from '../../../../../docs';

export interface InputProps extends BaseProps {
  id?: string;
  value?: string;
}

export const Input = ({ id, type, invalid, ...props }: InputProps) =>
  html('input', {
    ...props,
    class: classy(c('input'), m({ invalid })),
    id,
    type,
  });
