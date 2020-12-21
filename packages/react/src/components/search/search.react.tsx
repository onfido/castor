import { c, classy } from '@onfido/castor';
import { Icon } from '@onfido/castor-react';
import React from 'react';
import { withRef } from '../../utils';
import { Input, InputProps } from '../input/input.react';

/**
 * @note `Search` uses an `Icon` that requires `Icons` (SVG sprite) to be
 * included in your app.
 *
 * https://github.com/onfido/castor-icons#use-with-plain-code
 */
export const Search = withRef(
  (
    { className, style, ...restProps }: SearchProps,
    ref: SearchProps['ref']
  ) => (
    <div className={classy(c('search'), className)} style={style}>
      <Input {...restProps} ref={ref} type="search" />
      <Icon name="search" />
    </div>
  )
);

export type SearchProps = Omit<InputProps, 'invalid' | 'type'>;
