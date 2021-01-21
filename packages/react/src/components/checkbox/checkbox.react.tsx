import { c, CheckboxProps as BaseProps, classy, m } from '@onfido/castor';
import React from 'react';
import { InputContainer } from '../../internal';
import { withRef } from '../../utils';

export const Checkbox = withRef(
  (
    {
      bordered,
      invalid,
      children,
      className,
      style,
      ...restProps
    }: CheckboxProps,
    ref: CheckboxProps['ref']
  ): JSX.Element => (
    <InputContainer bordered={bordered} className={className} style={style}>
      {{
        children,
        input: (
          <input
            {...restProps}
            ref={ref}
            type="checkbox"
            className={classy(c('checkbox'), m({ invalid }))}
          />
        ),
      }}
    </InputContainer>
  )
);
Checkbox.displayName = 'Checkbox';

export type CheckboxProps = BaseProps &
  Omit<JSX.IntrinsicElements['input'], 'type'>;
