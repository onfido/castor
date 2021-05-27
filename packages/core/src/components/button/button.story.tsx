import { ButtonProps as BaseProps, c, classy, m } from '@onfido/castor';
import { html } from '../../../../../docs';

export interface ButtonProps extends BaseProps {
  children?: string | null;
  href?: string;
}

export const Button = ({ href, kind, variant, ...props }: ButtonProps) =>
  html(href ? 'a' : 'button', {
    ...props,
    class: classy(c('button'), m(`${kind}--${variant}`)),
    href,
    role: href && 'button',
  });
