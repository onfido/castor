import { c, classy, InputProps as BaseProps, m } from '@onfido/castor';
import { useField } from '@onfido/castor-react';
import React from 'react';
import { FieldLabelWrapper } from '../../internal';
import { withRef } from '../../utils';

let idCount = 0;

export const Input = withRef(function Input(
  {
    id = `castor_input_${++idCount}`,
    type = 'text',
    invalid,
    children,
    className,
    ...restProps
  }: InputProps,
  ref?: InputProps['ref']
) {
  const { disabled, touched } = useField();

  return (
    <FieldLabelWrapper htmlFor={id}>
      {{
        children,
        element: (
          <input
            disabled={disabled} // will be overriden by props if set
            {...restProps}
            ref={ref}
            id={id}
            type={type}
            className={classy(c('input'), m({ invalid, touched }), className)}
          />
        ),
      }}
    </FieldLabelWrapper>
  );
});

export type InputProps = BaseProps &
  Omit<InputElementProps, 'children'> & {
    /**
     * @deprecated
     * Use component composition instead.
     *
     * @example
     * <FieldLabel>
     *   My Label
     *   <Input name="my-input" />
     * </FieldLabel>
     */
    children?: InputElementProps['children'];
  };

type InputElementProps = JSX.IntrinsicElements['input'];
