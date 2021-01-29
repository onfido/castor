import { c, CheckboxProps as BaseProps, classy, m } from '@onfido/castor';
import React from 'react';
import { IndicatorContainer, splitContainerProps } from '../../internal';
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
  ): JSX.Element => {
    const [containerProps, inputProps] = splitContainerProps(restProps);

    return (
      <IndicatorContainer
        {...containerProps}
        bordered={bordered}
        className={className}
        style={style}
      >
        {{
          children,
          input: (
            <input
              {...inputProps}
              ref={ref}
              type="checkbox"
              className={classy(c('checkbox'), m({ invalid }))}
            />
          ),
        }}
      </IndicatorContainer>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export type CheckboxProps = BaseProps &
  Omit<JSX.IntrinsicElements['input'], 'type'>;
