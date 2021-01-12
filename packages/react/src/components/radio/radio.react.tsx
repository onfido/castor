import { c, classy, m, RadioProps as BaseProps } from '@onfido/castor';
import React from 'react';
import { withRef } from '../../utils';

export const Radio = withRef(
  (
    { bordered, invalid, children, className, style, ...restProps }: RadioProps,
    ref: RadioProps['ref']
  ): JSX.Element => (
    <label
      className={classy(c('radio-label'), m({ bordered }), className)}
      style={style}
    >
      <input
        {...restProps}
        ref={ref}
        type="radio"
        className={classy(c('radio-input'), m({ invalid }))}
      />
      <span className={classy(c('radio-indicator'))} aria-hidden="true" />
      {children && <span>{children}</span>}
    </label>
  )
);

export type RadioProps = BaseProps &
  Omit<JSX.IntrinsicElements['input'], 'type'>;
