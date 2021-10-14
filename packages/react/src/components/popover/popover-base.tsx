import { c, classy, m, PopoverProps as BaseProps } from '@onfido/castor';
import React from 'react';
import { withRef } from '../../utils';

export const PopoverBase = withRef(function Popover(
  {
    align,
    className,
    position,
    ...props
  }: BaseProps & Div & Required<Pick<BaseProps, 'align' | 'position'>>,
  ref?: Div['ref']
) {
  return (
    <div
      {...props}
      ref={ref}
      className={classy(c('popover'), m(`${position}--${align}`), className)}
    />
  );
});

type Div = JSX.IntrinsicElements['div'];
