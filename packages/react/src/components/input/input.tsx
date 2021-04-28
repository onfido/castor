import { c, classy, InputProps as BaseProps, m } from '@onfido/castor';
import { useField } from '@onfido/castor-react';
import React, { useState } from 'react';
import { FieldLabelWrapper } from '../../internal';
import { withRef } from '../../utils';

const idPrefix = 'castor_input';
let idCount = 0;

export const Input = withRef(
  (
    {
      id: externalId,
      type = 'text',
      invalid,
      label: externalLabel,
      children,
      className,
      ...restProps
    }: InputProps,
    ref: InputProps['ref']
  ): JSX.Element => {
    const { disabled, touched } = useField();
    const label = externalLabel || children;
    const [autoId] = useState(() => `${idPrefix}_${++idCount}`);
    const id = externalId || (label ? autoId : undefined);

    return (
      <FieldLabelWrapper id={id}>
        {{
          label,
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
    /** @deprecated Use `label` prop instead */
    children?: InputElementProps['children'];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    label?: any;
  };

type InputElementProps = JSX.IntrinsicElements['input'];
