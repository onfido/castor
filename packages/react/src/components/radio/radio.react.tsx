import { c, classy, m, RadioProps as BaseProps } from '@onfido/castor';
import { InputContainer } from '@onfido/castor-react';
import React from 'react';
import { withRef } from '../../utils';

export const Radio = withRef(
  (
    { bordered, invalid, children, className, style, ...restProps }: RadioProps,
    ref: RadioProps['ref']
  ): JSX.Element => (
    <InputContainer bordered={bordered} className={className} style={style}>
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
    </InputContainer>
  )
);
Radio.displayName = 'Radio';

export type RadioProps = BaseProps &
  Omit<JSX.IntrinsicElements['input'], 'type'>;
