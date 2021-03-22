import { c, CheckboxProps as BaseProps, classy, m } from '@onfido/castor';
import { useField } from '@onfido/castor-react';
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
    const { disabled, touched } = useField();
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
              disabled={disabled} // will be overriden by props if set
              {...inputProps}
              ref={ref}
              type="checkbox"
              className={classy(c('checkbox'), m({ invalid, touched }))}
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
