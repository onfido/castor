import { InputProps as BaseProps } from '@onfido/castor';
import { html } from '../../../../../docs';
import { c, classy, m } from '../../utils';

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
