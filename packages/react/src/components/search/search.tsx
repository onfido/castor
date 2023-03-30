import { c, classy } from '@onfido/castor';
import React from 'react';
import { MaybeIcon } from '../../internal';
import { withRef } from '../../utils';
import { Input, InputProps } from '../input/input';

/**
 * `Search` by default uses an `Icon` that requires `Icons` (SVG sprite) to be
 * included in your app.
 *
 * https://github.com/onfido/castor-icons#use-with-plain-code
 *
 * You may also provide any other SVG element via the `icon` prop, but using
 * Castor iconography is recommended.
 */
export const Search = withRef(function Search(
  { className, icon, style, ...restProps }: SearchProps,
  ref: SearchProps['ref']
) {
  return (
    <div className={classy(c('search'), className)} style={style}>
      <Input {...restProps} ref={ref} type="search" />
      <MaybeIcon icon={icon} name="search" />
    </div>
  );
});

export type SearchProps = Omit<InputProps, 'type' | 'invalid' | 'children'> & {
  icon?: JSX.Element;
};
