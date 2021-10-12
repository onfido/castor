import { c, CheckboxProps as BaseProps, classy, m } from '@onfido/castor';
import { useField } from '@onfido/castor-react';
import React from 'react';
import { IndicatorContainer, splitContainerProps } from '../../internal';
import { withRef } from '../../utils';

let count = 0;

export const Checkbox = withRef(function Checkbox(
  {
    id = `castor_checkbox_${++count}`,
    bordered,
    invalid,
    children,
    className,
    style,
    ...restProps
  }: CheckboxProps,
  ref: CheckboxProps['ref']
) {
  const { disabled, touched } = useField();
  const [containerProps, inputProps] = splitContainerProps(restProps);

  return (
    <IndicatorContainer
      {...containerProps}
      htmlFor={id}
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
            id={id}
            type="checkbox"
            className={classy(c('checkbox'), m({ invalid, touched }))}
          />
        ),
      }}
    </IndicatorContainer>
  );
});

export type CheckboxProps = BaseProps &
  Omit<JSX.IntrinsicElements['input'], 'type'>;
