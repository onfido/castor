import { c, classy, color, IconProps as BaseProps } from '@onfido/castor';
import React from 'react';

/**
 * @note `Icon` requires `Icons` (SVG sprite) to be included in your app.
 * If you wish to use individual inlined SVGs, use generated components
 * from `@onfido/castor-icons` instead.
 *
 * https://github.com/onfido/castor-icons
 */
export const Icon = ({
  name,
  color: token,
  className,
  ...restProps
}: IconProps): JSX.Element => (
  <svg
    {...restProps}
    fill={token ? color(token) : 'currentColor'}
    focusable="false"
    className={classy(c('icon'), className)}
  >
    <use href={`#${name}`}></use>
  </svg>
);

export type IconProps = BaseProps & JSX.IntrinsicElements['svg'];
