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
}: ProgressProps): JSX.Element => {
  const normalizedValue = Math.round((value / max) * 100);

  return (
    <div
      className={classy(c('progress'), m(size), className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuetext={!hideLabel && children ? children : undefined}
    >
      <div className={classy(c('progress-background'), m(size))}>
        <div
          className={classy(c('progress-indicator'))}
          style={{ width: `${normalizedValue}%` }}
        />
      </div>
      {!hideLabel && (
        <div className={classy(c('progress-label'), m(size))}>
          {children || `${normalizedValue}%`}
        </div>
      )}
    </div>
  );
};

export type ProgressProps = BaseProps & JSX.IntrinsicElements['progress'];
