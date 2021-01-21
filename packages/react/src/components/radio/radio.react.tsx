import { c, classy, m, RadioProps as BaseProps } from '@onfido/castor';
import React from 'react';
import { IndicatorContainer } from '../../internal';
import { withRef } from '../../utils';

export const Radio = withRef(
  (
    { bordered, invalid, children, className, style, ...restProps }: RadioProps,
    ref: RadioProps['ref']
  ): JSX.Element => (
    <IndicatorContainer bordered={bordered} className={className} style={style}>
      {{
        children,
        input: (
          <input
            {...restProps}
            ref={ref}
            type="radio"
            className={classy(c('radio'), m({ invalid }))}
          />
        ),
      }}
    </IndicatorContainer>
  )
);
Radio.displayName = 'Radio';

export type RadioProps = BaseProps &
  Omit<JSX.IntrinsicElements['input'], 'type'>;
