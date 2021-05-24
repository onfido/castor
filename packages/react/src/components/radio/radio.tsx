import { c, classy, m, RadioProps as BaseProps } from '@onfido/castor';
import { useField } from '@onfido/castor-react';
import React from 'react';
import { useAutoId } from '../../hooks';
import { IndicatorContainer, splitContainerProps } from '../../internal';
import { withRef } from '../../utils';

export const Radio = withRef(
  (
    {
      id: externalId,
      bordered,
      invalid,
      children,
      className,
      style,
      ...restProps
    }: RadioProps,
    ref: RadioProps['ref']
  ): JSX.Element => {
    const { disabled, touched } = useField();
    const autoId = useAutoId('castor_radio');
    const id = externalId || autoId;
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
  }
);
Radio.displayName = 'Radio';

export type RadioProps = BaseProps &
  Omit<JSX.IntrinsicElements['input'], 'type'>;
