import { c, classy, InputProps as BaseProps, m } from '@onfido/castor';
import { FieldLabel } from '@onfido/castor-react';
import React, { Fragment } from 'react';
import { withRef } from '../../utils';

export const Input = withRef(
  (
    { type = 'text', invalid, children, className, ...restProps }: InputProps,
    ref: InputProps['ref']
  ): JSX.Element => {
    const Wrapper = children ? FieldLabel : Fragment;

    return (
      <Wrapper>
        {children && <span>{children}</span>}
        <input
          {...restProps}
          ref={ref}
          type={type}
          className={classy(c('input'), m({ invalid }), className)}
        />
      </Wrapper>
    );
  }
);
Input.displayName = 'Input';

export type InputProps = BaseProps & JSX.IntrinsicElements['input'];
