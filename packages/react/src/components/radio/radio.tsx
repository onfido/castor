import { c, classy, m, RadioProps as BaseProps } from '@onfido/castor';
import { useField } from '@onfido/castor-react';
import React from 'react';
import { IndicatorContainer, splitContainerProps } from '../../internal';
import { withRef } from '../../utils';

let idCount = 0;

export const Radio = withRef(function Radio(
  {
    id = `castor_radio_${++idCount}`,
    bordered,
    invalid,
    children,
    className,
    style,
    ...restProps
  }: RadioProps,
  ref: RadioProps['ref']
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
            type="radio"
            className={classy(c('radio'), m({ invalid, touched }))}
          />
        ),
      }}
    </IndicatorContainer>
  );
});

export type RadioProps = BaseProps &
  Omit<JSX.IntrinsicElements['input'], 'type'>;
