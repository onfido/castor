import { c, CheckboxProps as BaseProps, classy, m } from '@onfido/castor';
import { InputContainer } from '@onfido/castor-react';
import React from 'react';
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
    <InputContainer {...{ bordered, className, style }}>
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
