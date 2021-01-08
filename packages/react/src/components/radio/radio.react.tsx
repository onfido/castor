import { c, classy, RadioProps as BaseProps, m } from '@onfido/castor';
import React, { useState } from 'react';
import { withRef } from '../../utils';

export const Radio = withRef(
  (
    {
      bordered,
      defaultChecked = false,
      checked: externalChecked,
      invalid,
      disabled,
      children,
      className,
      style,
      onChange,
      ...restProps
    }: RadioProps,
    ref: RadioProps['ref']
  ): JSX.Element => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);

    const externallyControlled = typeof externalChecked === 'boolean';
    const checked = externallyControlled ? externalChecked : internalChecked;

    return (
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
          onChange={(e) => {
            if (!externallyControlled) setInternalChecked(e.target.checked);
            if (onChange) onChange(e);
          }}
        />
        <span /* custom "checked" indicator */ aria-hidden="true" />
        {children && <span>{children}</span>}
      </label>
    );
  }
);

export type RadioProps = BaseProps &
  Omit<JSX.IntrinsicElements['input'], 'type'>;
