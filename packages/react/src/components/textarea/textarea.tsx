import { c, classy, m, TextareaProps as BaseProps } from '@onfido/castor';
import { useField } from '@onfido/castor-react';
import React from 'react';
import { withRef } from '../../utils';

let idCount = 0;

export const Textarea = withRef(function Textarea(
  {
    id = `castor_textarea_${++idCount}`,
    resize = 'vertical',
    rows = 3,
    invalid,
    className,
    style,
    ...restProps
  }: TextareaProps,
  ref?: TextareaProps['ref']
) {
  const { disabled, touched } = useField();

  return (
    <textarea
      disabled={disabled} // will be overriden by props if set
      {...restProps}
      ref={ref}
      id={id}
      rows={rows}
      className={classy(c('textarea'), m({ invalid, touched }), className)}
      style={{ ...style, resize }}
    />
  );
});

export type TextareaProps = BaseProps & Omit<TextareaElementProps, 'children'>;

type TextareaElementProps = JSX.IntrinsicElements['textarea'];
