import { c, classy, m, TextareaProps as BaseProps } from '@onfido/castor';
import React from 'react';
import { withRef } from '../../utils';

export const Textarea = withRef(function Textarea(
  {
    resize = 'vertical',
    rows = 3,
    invalid,
    className,
    style,
    ...restProps
  }: TextareaProps,
  ref: TextareaProps['ref']
): JSX.Element {
  return (
    <textarea
      {...restProps}
      ref={ref}
      rows={rows}
      className={classy(c('textarea'), m({ invalid }), className)}
      style={{ ...style, resize }}
    />
  );
});

export type TextareaProps = BaseProps &
  Omit<JSX.IntrinsicElements['textarea'], 'children'>;
