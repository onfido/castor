import { ButtonProps as BaseProps } from '@onfido/castor';
import { html } from '../../../../../docs';
import { c, classy, m } from '../../utils';

export interface ButtonProps extends BaseProps {
  children: string;
  href?: string;
}

export const Button = ({ href, kind, variant, ...props }: ButtonProps) =>
  html(href ? 'a' : 'button', {
    ...props,
    class: classy(c('button'), m(`${kind}--${variant}`)),
    href,
    role: href && 'button',
  });
