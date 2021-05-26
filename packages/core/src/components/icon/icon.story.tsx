import { c, classy, color, IconProps } from '@onfido/castor';
import { html } from '../../../../../docs';

/**
 * `.ods-icon` requires SVG sprite to be included in your app.
 *
 * https://github.com/onfido/castor-icons
 *
 * Requires either `aria-hidden="true"` or `aria-label` for accessibility.
 */
export const Icon = ({
  name,
  color: token,
  'aria-hidden': ariaHidden,
  ...props
}: IconProps) =>
  html('svg', {
    ...props,
    'aria-hidden': `${ariaHidden || ''}`,
    class: classy(c('icon')),
    fill: token ? color(token) : 'currentColor',
    focusable: 'false',
    height: '24',
    width: '24',
    children: html('use', {
      href: `#${name}`,
    }),
  });
