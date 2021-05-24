import { c, classy, color, IconProps as BaseProps } from '@onfido/castor';
import { html } from '../../../../../docs';

export interface IconProps extends BaseProps {
  'aria-hidden'?: 'true' | 'false';
}

/**
 * `.ods-icon` requires SVG sprite to be included in your app.
 *
 * https://github.com/onfido/castor-icons
 */
export const Icon = ({ name, color: token, ...props }: IconProps) =>
  html('svg', {
    ...props,
    class: classy(c('icon')),
    fill: token ? color(token) : 'currentColor',
    focusable: 'false',
    height: '24',
    width: '24',
    children: html('use', {
      href: `#${name}`,
    }),
  });
