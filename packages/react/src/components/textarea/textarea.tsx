import { c, classy, m, TextareaProps as BaseProps } from '@onfido/castor';
import React, { useMemo } from 'react';
import { withRef } from '../../utils';
import { useField } from '../field/useField';

export const Textarea = withRef(function Textarea(
  {
    id: initialId,
    resize = 'vertical',
    rows = 3,
    invalid,
    className,
    style,
    ...restProps
  }: TextareaProps,
  ref: TextareaProps['ref']
) {
  const { disabled, touched } = useField();
  const id = useMemo(() => `castor_textarea_${++idCount}`, [initialId]);

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

let idCount = 0;
