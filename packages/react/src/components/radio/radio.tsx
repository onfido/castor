import { c, classy, m, RadioProps as BaseProps } from '@onfido/castor';
import { useField } from '@onfido/castor-react';
import React from 'react';
import { IndicatorContainer, splitContainerProps } from '../../internal';
import { withRef } from '../../utils';

export const Radio = withRef(
  (
    { bordered, invalid, children, className, style, ...restProps }: RadioProps,
    ref: RadioProps['ref']
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
