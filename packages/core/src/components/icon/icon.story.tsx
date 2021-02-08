import { html } from '../../../../../docs';
import { IconProps } from '@onfido/castor';

export const Icon = ({ name }: IconProps) =>
  html('svg', {
    fill: 'currentColor',
    focusable: 'false',
    height: '24',
    width: '24',
    children: html('use', {
      href: `#${name}`,
    }),
  });
