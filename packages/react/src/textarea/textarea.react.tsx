import { c, classy, m, TextareaProps as BaseProps } from '@onfido/castor';
import React from 'react';

export const Textarea = ({
  resize = 'vertical',
  rows = 3,
  invalid,
  className,
  style,
  ...restProps
}: TextareaProps): JSX.Element => (
  <textarea
    {...restProps}
    rows={rows}
    className={classy(c('textarea'), m({ invalid }), className)}
    style={{ ...style, resize }}
  />
);

export type TextareaProps = BaseProps & JSX.IntrinsicElements['textarea'];
