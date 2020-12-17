import { c, classy } from '@onfido/castor';
import { Icon } from '@onfido/castor-react';
import React from 'react';
import { Input, InputProps } from '../input/input.react';
import { withRef } from '../utils';

export const Search = withRef(
  ({ className, style, ...props }: SearchProps, ref: SearchProps['ref']) => (
    <div className={classy(c('search'), className)} style={style}>
      <Input {...props} ref={ref} type="search" />
      <Icon name="search" />
    </div>
  )
);

export type SearchProps = Omit<InputProps, 'children' | 'invalid' | 'type'>;
