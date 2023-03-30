import { c, classy, m, RadioProps as BaseProps } from '@onfido/castor';
import React, { useMemo } from 'react';
import { IndicatorContainer, splitContainerProps } from '../../internal';
import { withRef } from '../../utils';
import { useField } from '../field/useField';

export const Radio = withRef(function Radio(
  {
    id: initialId,
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
  const id = useMemo(() => `castor_radio_${++idCount}`, [initialId]);
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

export type RadioProps = BaseProps & Omit<InputElementProps, 'type'>;

type InputElementProps = JSX.IntrinsicElements['input'];

let idCount = 0;
