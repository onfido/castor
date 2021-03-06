import {
  c,
  classy,
  cssVars,
  m,
  ProgressProps as BaseProps,
} from '@onfido/castor';
import React, { useMemo } from 'react';

export const Progress = ({
  value,
  min = 0,
  max = 100,
  size = 'regular',
  hideLabel,
  children,
  style,
  className,
  'aria-valuetext': ariaValuetext,
  ...restProps
}: ProgressProps): JSX.Element => {
  const percentValue = useMemo(
    () => `${Math.round(((value - min) * 100) / (max - min))}%`,
    [value, min, max]
  );

  return (
    <div
      {...restProps}
      className={classy(c('progress'), m(size), className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuetext={
        ariaValuetext || (typeof children === 'string' ? children : undefined)
      }
      style={{ ...(style ?? {}), ...cssVars({ percentValue }) }}
    >
      {!hideLabel && (children || percentValue)}
    </div>
  );
};

export type ProgressProps = BaseProps &
  Omit<
    JSX.IntrinsicElements['div'],
    'aria-valuemax' | 'aria-valuemin' | 'aria-valuenow' | 'role'
  >;
