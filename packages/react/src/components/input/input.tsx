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
      children,
      className,
      ...restProps
    }: InputProps,
    ref: InputProps['ref']
  ): JSX.Element => {
    const { disabled, touched } = useField();
    const [autoId] = useState(() => `${idPrefix}_${++idCount}`);
    const id = externalId || (children ? autoId : undefined);

    return (
      <FieldLabelWrapper id={id}>
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

export type InputProps = BaseProps & JSX.IntrinsicElements['input'];
