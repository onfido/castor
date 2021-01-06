import { c, classy, RadioProps as BaseProps, m } from '@onfido/castor';
import React from 'react';
import { withRef } from '../../utils';

export const Radio = withRef(
  (
    {
      label,
      description,
      bordered,
      checked,
      invalid,
      disabled,
      className,
      style,
      ...restProps
    }: RadioProps,
    ref: RadioProps['ref']
  ): JSX.Element => (
    <label
      className={classy(
        c('radio-label'),
        m({ bordered, checked, disabled }),
        className
      )}
      style={style}
    >
      <input
        {...{ ...restProps, checked, disabled }}
        ref={ref}
        type="radio"
        className={classy(c('radio-input'), m({ invalid }))}
      />
      <span /* custom "checked" indicator */ aria-hidden="true" />
      {(label || description) && (
        <span>
          <span>{label}</span>
          <span>{description}</span>
        </span>
      )}
    </label>
  )
);

export type RadioProps = BaseProps &
  Omit<JSX.IntrinsicElements['input'], 'type'>;
