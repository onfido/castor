import { html } from '../../../../../docs';
import { c, classy, m } from '../../utils';
import { ButtonProps } from '@onfido/castor';

export interface HtmlButtonProps extends ButtonProps {
  children: string;
  href?: string;
}

export const Button = ({ href, kind, variant, ...props }: HtmlButtonProps) =>
  html(href ? 'a' : 'button', {
    ...props,
    class: classy(c('button'), m(`${kind}--${variant}`)),
    href,
    role: href && 'button',
  });
