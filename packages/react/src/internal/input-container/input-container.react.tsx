import { c, classy, m } from '@onfido/castor';
import { InputContainerProps as BaseProps } from '@onfido/castor/src/internal';
import React from 'react';

/**
 * Container for `Checkbox` and `Radio` input components, adding custom
 * indicator within <label> element.
 */
export const InputContainer = ({
  bordered,
  children: { input, children },
  className,
  ...restProps
}: InputContainerProps): JSX.Element => (
  <label
    {...restProps}
    className={classy(c('input-label'), m({ bordered }), className)}
  >
    {input}
    <span className={classy(c('input-indicator'))} aria-hidden="true" />
    {children && <span>{children}</span>}
  </label>
);

export type InputContainerProps = BaseProps &
  Omit<JSX.IntrinsicElements['label'], 'children'> & {
    children: {
      children: JSX.IntrinsicElements['label']['children'];
      input: JSX.IntrinsicElements['input'];
    };
  };
