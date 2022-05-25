import { c, classy, InputProps as BaseProps, m } from '@onfido/castor';
import { useField } from '@onfido/castor-react';
import React, { useMemo } from 'react';
import { withRef } from '../../utils';

export const Input = withRef(function Input(
  {
    id: initialId,
    type = 'text',
    invalid,
    className,
    ...restProps
  }: InputProps,
  ref: InputProps['ref']
) {
  const { disabled, touched } = useField();
  const id = useMemo(() => `castor_input_${++idCount}`, [initialId]);

  return (
    <input
      disabled={disabled} // will be overriden by props if set
      {...restProps}
      ref={ref}
      id={id}
      type={type}
      className={classy(c('input'), m({ invalid, touched }), className)}
    />
  );
});

export type InputProps = BaseProps & Omit<InputElementProps, 'children'>;

type InputElementProps = JSX.IntrinsicElements['input'];

let idCount = 0;
