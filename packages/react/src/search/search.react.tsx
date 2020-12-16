import { c, classy } from '@onfido/castor';
import { Icon } from '@onfido/castor-react';
import React, { forwardRef } from 'react';
import { Input, InputProps } from '../input/input.react';

export const Search = forwardRef(_Search) as typeof _Search;
function _Search(
  { children, className, style, ...props }: SearchProps,
  ref: SearchProps['ref']
) {
  return (
    <label className={classy(c`search`, className)} style={style}>
      {children}
      <Input {...props} ref={ref} type="search" />
      <Icon name="search" />
    </label>
  );
}

export type SearchProps = InputProps;
