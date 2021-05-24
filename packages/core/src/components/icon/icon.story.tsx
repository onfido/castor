import { c, classy, color, IconProps } from '@onfido/castor';
import { html } from '../../../../../docs';

/**
 * `.ods-icon` requires SVG sprite to be included in your app.
 *
 * https://github.com/onfido/castor-icons
 */
export const Icon = ({ name, color: token }: IconProps) =>
  html('svg', {
    class: classy(c('icon')),
    fill: token ? color(token) : 'currentColor',
    focusable: 'false',
    height: '24',
    width: '24',
    children: html('use', {
      href: `#${name}`,
    }),
  });
