import React from 'react';
import { c, classy, color, IconProps as BaseProps } from '@onfido/castor';

/**
 * Please note that this component requires an SVG sprite to be inlined in your
 * app. If you wish to use individual inlined SVGs, use generated components
 * from Castor Icons package instead.
 *
 * More details:
 * https://gitlab.eu-west-1.mgmt.onfido.xyz/onfido/design/castor-icons
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
    className={classy(c`icon`, className)}
  >
    <use href={`#${name}`}></use>
  </svg>
);

export type IconProps = BaseProps & JSX.IntrinsicElements['svg'];
