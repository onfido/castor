import { IconProps } from '@onfido/castor';
import { html } from '../../../../../docs';
import { c, classy } from '../../utils';

/**
 * `.ods-icon` requires SVG sprite to be included in your app. If you wish to
 * use individual SVGs, import them directly from `@onfido/castor-icons/svg`
 * instead.
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
