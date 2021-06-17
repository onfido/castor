import { c, classy, m, ProgressProps as BaseProps } from '@onfido/castor';
import React from 'react';

export const Progress = ({
  value = 0,
  min = 0,
  max = 100,
  size = 'regular',
  hideLabel,
  children,
  className,
  'aria-valuetext': ariaValuetext,
  ...restProps
}: ProgressProps): JSX.Element => {
  const percentValue = Math.round(((value - min) * 100) / (max - min));

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
    >
      <div className={classy(c('progress-background'), m(size))}>
        <div
          className={classy(c('progress-indicator'))}
          style={{ width: `${percentValue}%` }}
        />
      </div>
      {!hideLabel && (
        <div className={classy(c('progress-label'), m(size))}>
          {children || `${percentValue}%`}
        </div>
      )}
    </div>
  );
};

export type ProgressProps = BaseProps &
  Omit<
    JSX.IntrinsicElements['div'],
    'aria-valuemax' | 'aria-valuemin' | 'aria-valuenow' | 'role'
  >;
