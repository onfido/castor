import { c, classy, InputProps as BaseProps, m } from '@onfido/castor';
import { FieldLabel } from '@onfido/castor-react';
import React, { Fragment } from 'react';
import { withRef } from '../../utils';

export const Input = withRef(
  (
    {
      id = `${autoIdPrefix}${autoId++}`,
      type = 'text',
      invalid,
      children,
      className,
      ...restProps
    }: InputProps,
    ref: InputProps['ref']
  ): JSX.Element => {
    const hasLabel = Boolean(children);
    const Wrapper = hasLabel ? FieldLabel : Fragment;

    return (
      <Wrapper {...{ ...(hasLabel && { htmlFor: id }) }}>
        {hasLabel && <span>{children}</span>}
        <input
          {...restProps}
          ref={ref}
          id={id}
          type={type}
          className={classy(c('input'), m({ invalid }), className)}
        />
      </Wrapper>
    );
  }
);
Input.displayName = 'Input';

const autoIdPrefix = 'castor_input_';
let autoId = 0;

export type InputProps = BaseProps & JSX.IntrinsicElements['input'];
