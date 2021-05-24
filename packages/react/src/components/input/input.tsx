import { c, classy, InputProps as BaseProps, m } from '@onfido/castor';
import { useField } from '@onfido/castor-react';
import React from 'react';
import { useAutoId } from '../../hooks';
import { FieldLabelWrapper } from '../../internal';
import { withRef } from '../../utils';

export const Input = withRef(
  (
    {
      id: externalId,
      type = 'text',
      invalid,
      children,
      className,
      ...restProps
    }: InputProps,
    ref: InputProps['ref']
  ): JSX.Element => {
    const { disabled, touched } = useField();
    const autoId = useAutoId('castor_input');
    const id = externalId || autoId;

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
  }
);
Input.displayName = 'Input';

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
