import { IconProps } from '@onfido/castor';
import { html } from '../../../../../docs';
import { c, classy } from '../../utils';

/**
 * `.ods-icon` requires SVG sprite to be included in your app.
 *
 * https://github.com/onfido/castor-icons
 */
export const Icon = ({ name }: IconProps) =>
  html('svg', {
    class: classy(c('icon')),
    fill: 'currentColor',
    focusable: 'false',
    height: '24',
    width: '24',
    children: html('use', {
      href: `#${name}`,
    }),
  });
