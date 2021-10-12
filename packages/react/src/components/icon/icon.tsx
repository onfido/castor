import { c, classy, color, IconProps as BaseProps } from '@onfido/castor';
import React from 'react';
import { withRef } from '../../utils';

/**
 * `Icon` requires `Icons` (SVG sprite) to be included in your app. If you wish
 * to use individual inlined SVGs, use generated components from
 * `@onfido/castor-icons` instead.
 *
 * https://github.com/onfido/castor-icons
 *
 * Requires either `aria-hidden="true"` or `aria-label` for accessibility.
 */
export const Icon = withRef(function Icon(
  { name, color: token, className, ...restProps }: IconProps,
  ref: IconProps['ref']
) {
  return (
    <svg
      {...restProps}
      ref={ref}
      fill={token ? color(token) : 'currentColor'}
      focusable="false"
      className={classy(c('icon'), className)}
    >
      <use href={`#${name}`}></use>
    </svg>
  );
});

export type IconProps = BaseProps & JSX.IntrinsicElements['svg'];
